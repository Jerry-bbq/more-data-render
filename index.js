const getList = () => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open('get', 'http://127.0.0.1:8000')
        xhr.send()
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const data = JSON.parse(xhr.responseText)
                resolve(data)
            }
        }
    })
}

const container = document.getElementById('container')

const btn = document.getElementById('btn-group')
btn.addEventListener('click', (e) => {
    const id = e.target.dataset.id
    switch (id) {
        case 'common':
            renderListByCommon();
            return;
        case 'fragment':
            renderListByFragment();
            return;
        case 'setTimeout':
            renderListBySetTimeout();
            return;
        case 'requestAnimationFrame':
            renderListByrequestAnimationFrame();
            return;
        case 'requestAnimationFrameAndFragment':
            renderListByRequestAnimationFrameAndFragment()
            return
    }
})

// 直接渲染，页面比较卡顿，耗时几秒
const renderListByCommon = async () => {
    console.time('列表时间')
    const list = await getList()
    list.forEach(item => {
        const div = document.createElement('div')
        div.className = 'sunshine'
        div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
        container.appendChild(div)
    })
    console.timeEnd('列表时间')
}

// 文档片段fragment，页面还是很卡顿，耗时几秒
const renderListByFragment = async () => {
    console.time('列表时间')
    const list = await getList()
    const fragment = document.createDocumentFragment()
    list.forEach(item => {
        const div = document.createElement('div')
        div.className = 'sunshine'
        div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
        fragment.appendChild(div)
    })
    container.appendChild(fragment)
    console.timeEnd('列表时间')
}


// 使用异步渲染，耗时几十毫秒
const renderListBySetTimeout = async () => {
    console.time('列表时间')
    const list = await getList()
    const total = list.length
    const page = 0
    const limit = 200
    const totalPage = Math.ceil(total / limit)

    const render = (page) => {
        if (page >= totalPage) return
        setTimeout(() => {
            for (let i = page * limit; i < page * limit + limit; i++) {
                const item = list[i]
                const div = document.createElement('div')
                div.className = 'sunshine'
                div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
                container.appendChild(div)
            }
            render(page + 1)
        }, 0)
    }
    render(page)
    console.timeEnd('列表时间')
}

// requestAnimationFrame
const renderListByrequestAnimationFrame = async () => {
    console.time('列表时间')
    const list = await getList()
    console.log(list)
    const total = list.length
    const page = 0
    const limit = 200
    const totalPage = Math.ceil(total / limit)

    const render = (page) => {
        if (page >= totalPage) return
        // 使用requestAnimationFrame代替setTimeout
        requestAnimationFrame(() => {
            for (let i = page * limit; i < page * limit + limit; i++) {
                const item = list[i]
                const div = document.createElement('div')
                div.className = 'sunshine'
                div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
                container.appendChild(div)
            }
            render(page + 1)
        })
    }
    render(page)
    console.timeEnd('列表时间')
}

// requestAnimationFrame + 文档碎片
const renderListByRequestAnimationFrameAndFragment = async () => {
    console.time('列表时间')
    const list = await getList()
    console.log(list)
    const total = list.length
    const page = 0
    const limit = 200
    const totalPage = Math.ceil(total / limit)

    const render = (page) => {
        if (page >= totalPage) return
        requestAnimationFrame(() => {
            // 创建一个文档碎片
            const fragment = document.createDocumentFragment()
            for (let i = page * limit; i < page * limit + limit; i++) {
                const item = list[i]
                const div = document.createElement('div')
                div.className = 'sunshine'
                div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
                // 先塞进文档碎片
                fragment.appendChild(div)
            }
            // 一次性appendChild
            container.appendChild(fragment)
            render(page + 1)
        })
    }
    render(page)
    console.timeEnd('列表时间')
}