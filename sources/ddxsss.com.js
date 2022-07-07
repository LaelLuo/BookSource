/**
 * 搜索
 * @params {string} key
 * @returns {[{name, author, cover, detail}]}
 */
const search = (key) => {
    let response = GET(`https://m.ddxsss.com/s?q=${encodeURI(key)}`)
    let array = []
    let $ = HTML.parse(response)
    $('div.item').forEach((child) => {
        let $ = HTML.parse(child)
        array.push({
            name: $('dt > a').text(),
            author: $('dt > span').text(),
            cover: $('div.image img').attr('src'),
            detail: `https://m.ddxsss.com${$('div.image > a').attr('href')}`,
        })
    })
    return JSON.stringify(array)
}


/**
 * 详情
 * @params {string} url
 * @returns {[{summary, status, category, words, update, lastChapter, catalog}]}
 */
const detail = (url) => {
    let response = GET(url)
    let $ = HTML.parse(response)
    let book = {
        summary: $('.book_about dd').text(),
        status: response.match(/状态：(.*?)</)[1],
        category: response.match(/分类：(.*?)</)[1],
        words: response.match(/字数：(.*?)</)[1].replace("字", ""),
        update: response.match(/更新：(.*?)</)[1],
        lastChapter: $('.book_last > dl > dd:nth-child(2) > a').text(),
        catalog: `https://m.ddxsss.com${$('div.book_more > a').attr('href')}`
    }
    return JSON.stringify(book)
}


/**
 * 目录
 * @params {string} url
 * @returns {[{name, url, vip}]}
 */
const catalog = (url) => {
    let response = GET(url)
    let $ = HTML.parse(response)
    let array = []
    $('dl > dt ~ dd').slice(1).forEach((chapter) => {
        let $ = HTML.parse(chapter)
        array.push({
            name: $('a').text(),
            url: `https://m.ddxsss.com${$('a').attr('href')}`
        })
    })
    return JSON.stringify(array)
}


/**
 * 章节
 * @params {string} url
 * @returns {string}
 */
const chapter = (url) => {
    let response = GET(url)
    let $ = HTML.parse(response)
    return $('#chaptercontent')
}


/**
 * 个人
 * @returns {[{url, nickname, recharge, balance[{name, coin}], sign}]}
 */
const profile = () => {
}

var bookSource = JSON.stringify({
    name: "顶点小说",
    url: "ddxsss.com",
    version: 100,
    authorization: "",
    cookies: []
})