/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof cntent !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'init') => {
  let target
  // scrollTop 获取方式不同只有documen.body才能用
  if (attr === 'scrollTop') {
    target = element.scrollTop
  } else if (element.currentStyle) {
    target = element.currentStyle[attr]
  } else {
    target = document.defaultView.getComputedStyle(element, null)[attr]
  }
  return NumberMode === 'float' ? parseFloat(target) : parseInt(target)
}

/**
 * 页面到底底部，加载更多
 */

export const loadMore = (element, callback) => {
  let windowHeight = window.screen.height
  let height, setTop, paddingBottom, marginBottom, requestFram, oldScrollTop
  element.addEventListener('touchstart', () => {
    height = element.offsetHeight
    setTop = element.offsetTop
    paddingBottom = parseInt(getStyle(element, 'paddingBottom'))
    marginBottom = parseInt(getStyle(element, 'marginBottom'))
  }, { passive: true })

  element.addEventListener('touchmove', () => {
    loadMore()
  }, { passive: true})

  element.addEventListener('touchend', () => {
    oldScrollTop = document.body.scrollTop
    moveEnd()
  }, { passive: true })

  const moveEnd = () => {
    requestFram = requestAnimationFrame(() => {
      if (document.body.scrollTop !== oldScrollTop) {
        oldScrollTop = document.body.scrollTop
        loadMore()
        moveEnd()
      } else {
        cancelAnimationFrame(requestFram)
        // 为了防止鼠标抬起时已经渲染好数据从而导致重获取数据，应该重新获取dom高度
        height = element.offsetHeight
        loadMore()
      }
    })
  }

  const loadMore = () => {
    if (document.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
      callback()
    }
  }
}

/**
 * 显示返回顶部按钮
 */
export const showBack = callback => {
  let requestFram, oldScrollTop

  document.addEventListener('touchstart', () => {
    showBackFun()
  }, { passive: true })

  document.addEventListener('touchmove', () => {
    showBackFun()
  }, { passive: true })

  document.addEventListener('touchend', () => {
    oldScrollTop = document.body.scrollTop
    moveEnd()
  }, { passive: true })

  const moveEnd = () => {
    requestFram = requestAnimationFrame(() => {
      if (document.body.scrollTop !== oldScrollTop) {
        oldScrollTop = document.body.scrollTop
        moveEnd()
      } else {
        cancelAnimationFrame(requestFram)
      }
      showBackFun()
    })
  }

  // 判断是否到达目标点
  const showBackFun = () => {
    if (document.body.scrollTop > 500) {
      callback(true)
    } else {
      callback(false)
    }
  }
}

/** 
 * 运动效果
 * @param { HTMLElement } element  运动对象，必选
 * @param { JSON }        target   属性：目标值，必选
 * @param { number }      duration 运动时间，可选
 * @param { string }      mode     运动模式，可选
 * @param { function }    callback 回调函数，链式动画，可选
*/
export const animate = (element, target, duration = 400, mode = 'ease-out', callback) => {
  clearInterval(element.timer)

  // 判断不同参数的情况
  if (duration instanceof Function) {
    callback = duration
    duration = 400
  } else if (duration instanceof String) {
    mode = duration
    duration = 400
  }

  // 判断不同参数情况
  if (mode instanceof Function) {
    callback = mode
    mode = 'ease-out'
  }

  // 获取dom样式
  const attrStyle = attr => {
    if (attr === 'opacity') {
      return Math.round(getStyle(element, attr, 'float') * 100)
    } else {
      return getStyle(element, attr)
    }
  }

  const rootSize = parseFloat(document.documentElement.style.fontSize)

  const unit = {}
  const initState = {}

  // 获取目标属性单位和初始样式值
  Object.keys(target).forEach(attr => {
    if (/[^\d^\.]+/gi.test(target[attr])) {
      unit[attr] = target[attr].match(/[^\d^\.]+/gi)[0] || 'px'
    } else {
      unit[attr] = 'px'
    }
    initState[attr] = attrStyle(attr)
  })

  // 去掉传入的后缀单位
  Object.keys(target).forEach(attr => {
    if (unit[attr] === 'rem') {
      target[attr] = Math.ceil(parseInt(target[attr]) * rootSize)
    } else {
      target[attr] = parseInt(target[attr])
    }
  })

  let flag = true // 假设所有运动到达终点
  const remberSpeed = {} // 记录上一个速度值，在ease-in模式下需要用到
  element.timer = setInterval(() => {
    Object.keys(target).forEach(attr => {
      let isSpeed = 0 // 步长
      let status = false // 是否仍需运动
      let iCurrent = attrStyle(attr) || 0 // 当前元素属性址
      let speedBase = 0 // 目标需要减去的基础值，三种运动状态的值都不同
      let intervalTime // 将目标值分为多少步执行，数值越大，步长越小，运动时间越长
      switch (mode) {
        case 'ease-out':
          speedBase = iCurrent
          intervalTime = duration * 20 / 400
          break;
        case 'linear':
          speedBase = initState[attr]
          intervalTime = duration * 20 / 400
          break;
        case 'ease-in':
          let oldspeed = remberSpeed[attr] || 0
          isSpeed = oldspeed + (target[attr] - initState[attr])/duration
          remberSpeed[attr] = isSpeed
          break;
        default:
          speedBase = iCurrent
          intervalTime = duration*5/400
      }
      if (mode !== 'ease-in') {
        isSpeed = (target[attr] - speedBase) / intervalTime
        isSpeed = isSpeed > 0 ? Math.ceil(isSpeed) : Math.floor(isSpeed)
      }
      switch (mode) {
        case 'ease-out':
          status = iCurrent !== target[attr]
          break;
        case 'linear':
          status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(isSpeed)
          break;
        case 'ease-in':
          status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(isSpeed)
          break;
        default:
          status = iCurrent !== target[attr]
      }

      if (status) {
        flag = false
        if (attr === 'opacity') {
          element.style.filter = `alpha(opacity:${iCurrent + isSpeed})`
          element.style.opacity = (iCurrent + isSpeed) / 100
        } else if (attr === 'scrollTop') {
          element.scrollTop = iCurrent + isSpeed
        } else {
          element.style[attr] = iCurrent + isSpeed + 'px'
        }
      } else {
        flag = true
      }

      if (flag) {
        clearInterval(element.timer)
        callback && callback()
      }
    })
  }, 20)
}
