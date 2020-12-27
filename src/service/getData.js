import fetch from '../config/fetch'
import * as home from './tempdata/home'
import * as city from './tempdata/city'

/**
 * 获取首页默认地址
 */
// const cityGuess = () => fetch('GET', '/v1/cities', {type: 'guess'})
/**
 * 获取首页热门城市
 */
// const hotcity = () => fetch('GET', '/v1/cities', {type: 'hot'})
/**
 * 获取首页所有城市
 */
// const groupcity = () => fetch('GET', '/v1/cities', {type: 'group'})
/**
 * 获取当前所在城市
 */
 //const currentcity = number => fetch('GET', '/v1/cities/' + number, {})
 /**
 * 获取搜索地址
 */
 //const searchplace = (cityid, value) => fetch('GET', '/v1/pois', {type: 'search', city_id: cityid, keyword: value})


// 临时数据
const setPromise = data => {
  return new Promise((resolve, reject) => {
    resolve(data)
  })
}

const cityGuess = () => setPromise(home.guesscity)
const hotcity = () => setPromise(home.guesscity)
const groupcity = () => setPromise(home.guesscity)
const currentcity = number => setPromise(city.currentcity)
const searchplace = (cityid, value) => setPromise(city.searchdata)

export { cityGuess, hotcity, groupcity, currentcity, searchplace }
