module.exports = options => {
    const assert = require('http-assert')
    const ok = require('assert')
    const jwt = require('jsonwebtoken');
    const AdminUser = require('../models/AdminUser');

    return async (req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop();
        // assert(token, 401, 'token，请先登录')
        if (!token) res.status(401).send({ message: '请先登录' })
        const { id } = jwt.verify(token, req.app.get('secret'));
        // assert(id, 401, 'id，请先登录')
        if (!id) res.status(401).send({ message: '请先登录' })
        req.user = await AdminUser.findById(id)
        // assert(req.user, 401, '未授权，请先登录')
        if (!req.user) res.status(401).send({ message: '请先登录' })

        await next()
    }
}