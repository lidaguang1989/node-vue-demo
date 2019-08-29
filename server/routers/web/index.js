module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const mongoose = require('mongoose')

  // const Category = require('../../models/Category')
  // const Article = require('../../models/Article')
  const Category = mongoose.model('Category')
  const Article = mongoose.model('Article')
  const Hero = mongoose.model('Hero')

  // 新闻资讯批量插入数据接口（测试用）
  router.get('/init/news', async (req, res, next) => {
    const parent = await Category.findOne({
      name: '新闻分类'
    })

    const cats = await Category.find().where({
      parent: parent
    }).lean()
    const newsTitles = ["最强战队争霸赛参赛指南，如何让战队提升排名入围淘汰赛", "审判系统信誉经验恢复速率调整公告", "王者荣耀公布“无限开放计划”：探索游戏边界，共享荣耀", "暑期粉丝节狂欢，快手直播邀你一起来上分！", "《王者荣耀》对话岭南优秀非遗文化 跨界融合南狮发力新文创", "8月27日全服不停机更新公告", "审判系统信誉经验恢复速率调整公告", "【已开服】8月15日正式服“五虎上将”版本更新公告", "8月28日体验服不停机更新公告", "8月27日体验服停机更新公告", "乘风破浪闯峡谷 SNK永久英雄免费拿", "峡谷最强战队争霸赛今日开启，全新赛制抢先体验！", "最强战队争霸赛参赛指南，如何让战队提升排名入围淘汰赛", "新版本峡谷狂欢活动周开启", "【微信游戏专属】微信游戏6周年活动已开启", "2019年KPL秋季赛大名单公布", "古韵中的电竞，城市赛省赛再燃热血！", "赛程过半，城市赛省赛高光时刻齐回顾！", "2019年KPL秋季转会期俱乐部挂牌名单公布", "AG超玩会重回KPL秋季赛，2019KPL秋季赛转会期窗口今日开启"]
    const newArticle = newsTitles.map(title => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
      return {
        title: title,
        categories: randomCats.slice(0, 2)
      }
    })

    await Article.deleteMany({})
    await Article.insertMany(newArticle)

    res.send(newArticle);
  })

  // 获取新闻资讯
  router.get('/news/list', async (req, res) => {
    const parent = await Category.findOne({
      name: '新闻分类'
    })
    const cats = await Category.aggregate([{
        $match: {
          parent: parent._id
        }
      },
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList'
        }
      },
      {
        $addFields: {
          newsList: {
            $slice: ['$newsList', 5]
          }
        }
      }
    ])

    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      newsList: await Article.find().where({
        categories: {
          $in: subCats
        }
      }).populate('categories').limit(5).lean()
    })

    cats.map(cat => {
      cat.newsList.map(news => {
        if (cat.name === '热门') {
          news.categoryName = news.categories[0].name
        } else {
          news.categoryName = cat.name
        }
        return news
      })
      return cat
    })

    res.send(cats)
  })

  // 批量导入英雄数据(测试用)
  router.get('/heroes/init', async (req, res) => {
    await Hero.deleteMany({})

    const heroesData = [{
      "name": "热门",
      "heroes": [{
        "name": "鲁班七号",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"
      }, {
        "name": "孙尚香",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg"
      }, {
        "name": "孙悟空",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"
      }, {
        "name": "铠",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
      }, {
        "name": "后羿",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"
      }, {
        "name": "亚瑟",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
      }, {
        "name": "妲己",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"
      }, {
        "name": "安琪拉",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"
      }, {
        "name": "甄姬",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"
      }, {
        "name": "李白",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg"
      }]
    }, {
      "name": "战士",
      "heroes": [{
        "name": "赵云",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg"
      }, {
        "name": "钟无艳",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"
      }, {
        "name": "吕布",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"
      }, {
        "name": "曹操",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg"
      }, {
        "name": "典韦",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg"
      }, {
        "name": "宫本武藏",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg"
      }, {
        "name": "达摩",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"
      }, {
        "name": "老夫子",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg"
      }, {
        "name": "关羽",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg"
      }, {
        "name": "露娜",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg"
      }, {
        "name": "花木兰",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg"
      }, {
        "name": "亚瑟",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
      }, {
        "name": "孙悟空",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"
      }, {
        "name": "刘备",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg"
      }, {
        "name": "杨戬",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg"
      }, {
        "name": "雅典娜",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg"
      }, {
        "name": "哪吒",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg"
      }, {
        "name": "铠",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
      }, {
        "name": "狂铁",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg"
      }, {
        "name": "李信",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg"
      }, {
        "name": "盘古",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg"
      }, {
        "name": "曜",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/522/522.jpg"
      }, {
        "name": "马超",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg"
      }]
    }, {
      "name": "法师",
      "heroes": [{
        "name": "小乔",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg"
      }, {
        "name": "墨子",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"
      }, {
        "name": "妲己",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"
      }, {
        "name": "嬴政",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg"
      }, {
        "name": "高渐离",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg"
      }, {
        "name": "扁鹊",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg"
      }, {
        "name": "芈月",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"
      }, {
        "name": "周瑜",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg"
      }, {
        "name": "甄姬",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"
      }, {
        "name": "武则天",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg"
      }, {
        "name": "貂蝉",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg"
      }, {
        "name": "安琪拉",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"
      }, {
        "name": "姜子牙",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg"
      }, {
        "name": "王昭君",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg"
      }, {
        "name": "张良",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg"
      }, {
        "name": "不知火舞",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg"
      }, {
        "name": "钟馗",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg"
      }, {
        "name": "诸葛亮",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg"
      }, {
        "name": "干将莫邪",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg"
      }, {
        "name": "女娲",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg"
      }, {
        "name": "杨玉环",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg"
      }, {
        "name": "弈星",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg"
      }, {
        "name": "米莱狄",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg"
      }, {
        "name": "沈梦溪",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg"
      }, {
        "name": "上官婉儿",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg"
      }, {
        "name": "嫦娥",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"
      }]
    }, {
      "name": "坦克",
      "heroes": [{
        "name": "廉颇",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg"
      }, {
        "name": "刘禅",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"
      }, {
        "name": "白起",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg"
      }, {
        "name": "夏侯惇",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"
      }, {
        "name": "项羽",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg"
      }, {
        "name": "程咬金",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"
      }, {
        "name": "刘邦",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg"
      }, {
        "name": "牛魔",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"
      }, {
        "name": "张飞",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"
      }, {
        "name": "东皇太一",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg"
      }, {
        "name": "苏烈",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"
      }, {
        "name": "梦奇",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg"
      }, {
        "name": "孙策",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"
      }, {
        "name": "猪八戒",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg"
      }]
    }, {
      "name": "刺客",
      "heroes": [{
        "name": "阿轲",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg"
      }, {
        "name": "李白",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg"
      }, {
        "name": "韩信",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg"
      }, {
        "name": "兰陵王",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg"
      }, {
        "name": "娜可露露",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg"
      }, {
        "name": "橘右京",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg"
      }, {
        "name": "百里玄策",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg"
      }, {
        "name": "裴擒虎",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg"
      }, {
        "name": "元歌",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg"
      }, {
        "name": "司马懿",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg"
      }, {
        "name": "云中君",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg"
      }]
    }, {
      "name": "射手",
      "heroes": [{
        "name": "孙尚香",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg"
      }, {
        "name": "鲁班七号",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"
      }, {
        "name": "马可波罗",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg"
      }, {
        "name": "狄仁杰",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg"
      }, {
        "name": "后羿",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"
      }, {
        "name": "李元芳",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg"
      }, {
        "name": "虞姬",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg"
      }, {
        "name": "成吉思汗",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg"
      }, {
        "name": "黄忠",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg"
      }, {
        "name": "百里守约",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg"
      }, {
        "name": "公孙离",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg"
      }, {
        "name": "伽罗",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg"
      }]
    }, {
      "name": "辅助",
      "heroes": [{
        "name": "庄周",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"
      }, {
        "name": "孙膑",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg"
      }, {
        "name": "蔡文姬",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg"
      }, {
        "name": "太乙真人",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"
      }, {
        "name": "大乔",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg"
      }, {
        "name": "鬼谷子",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg"
      }, {
        "name": "明世隐",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg"
      }, {
        "name": "盾山",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg"
      }, {
        "name": "瑶",
        "icon": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg"
      }]
    }];
    for (let item of heroesData) {
      if (item.name === '热门') continue;

      const category = await Category.findOne({
        name: item.name
      })
      item.heroes = item.heroes.map(hero => {
        hero.categories = [category]
        return hero
      })

      // 写入英雄
      await Hero.insertMany(item.heroes)
    }

    res.send(await Hero.find())
  })

  // 获取英雄数据
  router.get('/heroes/list', async (req, res) => {
    const parent = await Category.findOne({
      name: '英雄分类'
    })
    const cats = await Category.aggregate([{
        $match: {
          parent: parent._id
        }
      },
      {
        $lookup: {
          from: 'heroes',
          localField: '_id',
          foreignField: 'categories',
          as: 'heroesList'
        }
      }
    ])

    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      heroesList: await Hero.find().where({
        categories: {
          $in: subCats
        }
      }).limit(10).lean()
    })

    res.send(cats)
  })

  // 获取文章详情
  router.get('/articles/:id', async (req, res) => {
    const data = await Article.findById(req.params.id).lean()
    data.related = await Article.find().where({
      categories: {$in: data.categories}
    }).limit(2)

    res.send(data);
  })

  // 获取英雄详情
  router.get('/heroes/:id', async (req, res) => {
    const data = await Hero
    .findById(req.params.id)
    .populate('categories')
    .populate('itemsGood')
    .populate('itemsBad')
    .populate('partners.hero')
    .lean()
    res.send(data)
  })

  app.use('/web/api', router)
}