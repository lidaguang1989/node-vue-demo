module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken');
    const AdminUser = require('../../models/AdminUser');
    // const assert = require('http-assert')
    const authMiddleware = require('../../middleware/auth')
    const resourceMiddleware = require('../../middleware/resource')

    const router = express.Router({
        mergeParams: true
    })

    // 创建
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    // 更新
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 获取列表
    router.get('/', async (req, res) => {
        let populaterOptions = {};
        if (req.Model.modelName === 'Category') {
            populaterOptions.populate = 'parent';
        }
        const items = await req.Model.find().setOptions(populaterOptions).limit(100)
        res.send(items)
    })

    // 获取指定id的数据
    router.get('/:id', async (req, res) => {
        const id = req.params.id;
        const model = await req.Model.findById(id)
        res.send(model)
    })

    // 删除
    router.delete('/:id', async (req, res) => {
        const id = req.params.id;
        const model = await req.Model.findByIdAndDelete(id)
        res.send({
            status: 0,
            message: 'delete success'
        })
    })

    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)


    const multer = require('multer')
    const upload = multer({
        dest: __dirname + '/../../uploads'
    })
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), (req, res) => {
        const file = req.file;
        file.url = 'http://node-vue-demo.topfullstack-test.club/uploads/' + file.filename
        res.send(file);
    })

    app.post('/admin/api/login', async (req, res) => {
        // 1. 查找用户名是否存在
        const { username, password } = req.body;
        const user = await AdminUser.findOne({ username }).select('+password');
        // assert(user, 422, '用户名不正确')
        if (!user) {
            res.status(422).send({message: '用户名不正确'})
            return;
        }
        // 2. 校验密码是否合法
        const isValid = require('bcrypt').compareSync(password, user.password);
        // assert(isValid, 422, '密码不正确')
        if (!isValid) {
            res.status(422).send({message: '密码不正确'})
            return;
        }
        // 3. 返回token
        const token = jwt.sign({id: user._id}, app.get('secret'))
        res.send({status: 0, data: {username: user.username, token: token}})
    })

    // 错误处理
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}