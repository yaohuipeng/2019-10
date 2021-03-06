let bell = document.getElementById('bell')
let say = document.getElementById('say')
let bgm = document.getElementById('bgm')
let btn = document.getElementsByClassName('btn')[0]
function loadBox() {
    let loadingBox = document.querySelector('.loadingBox');
    let progress = document.querySelector('.progress');// 获取进度条
    let ary = ['phone-bg.jpg', 'phone-listen.png', 'phone-key.png', 'phone-logo.png', 'phone-name.png', 'message-head1.png', 'message-head2.png', 'message-keyboard.png', 'cube-bg.jpg', 'cube-img1.png', 'cube-img2.png', 'cube-img3.png', 'cube-img4.png', 'cube-img5.png', 'cube-img6.png', 'cube-tip.png', 'menu-icon.png', 'concat-address.png', 'concat-icon1.png', 'concat-icon2.png', 'course-icon1.png', 'course-icon2.png', 'course-icon3.png', 'course-icon4.png', 'course-icon5.png', 'course-icon6.png', 'course-icon7.png', 'course-pocket.png', 'school-bot1.png', 'school-bot2.png', 'school-img1.jpg', 'school-img2.jpg', 'school-img3.jpg', 'teacher-title.png', 'zf-detailsReturn.png', 'zf-jobTable.png', 'zf-teacher1.png', 'zf-teacher2.png', 'zf-teacher3.jpg', 'zf-teacher4.png', 'zf-teacher5.png', 'zf-teacher6.png'];
    let n = 0 //记录已经加载的张数
    ary.forEach(item => {
        let img = new Image();
        img.src = `./images/${item}`;
        img.onload = function () {
            n++;
            let per = n / ary.length;
            progress.style.width = per * 100 + '%';
            if (n === ary.length) {
                // 所有图片都一经加载完成
                progress.addEventListener('transitionend', function (e) {
                    btn.classList.remove('hide');
                    // 阻止progress动效完成之后的冒泡
                }, false)
            }
        }
    })
    btn.ontouchend = function () {
        loadingBox.style.opacity = 0;
        loadingBox.addEventListener('transitionend', function (e) {
            // console.log(e)
            if (e.propertyName === 'opacity') {
                bell.play()
                loadingBox.classList.add('hide');
                phoneBoxFn(); // 第一屏完成之后再来第二屏
            }
        }, false)
    }

}
loadBox()

function phoneBoxFn() {
    let phoneBox = document.querySelector('.phoneBox')
    let circle = document.querySelector('.phoneBox .circle')
    let timeBox = document.querySelector('.phoneBox header h3')
    let footer = document.querySelector('.phoneBox footer')
    let overBox = document.querySelector('.phoneBox .overBox')
    let overBtn = overBox.querySelector('.overBtn')
    let claerFn = null
    circle.addEventListener('touchend', function () {
        timeBox.classList.remove('hide')
        footer.classList.add('hide')
        overBox.classList.remove('bot')
        bell.pause()
        say.play()
        claerFn = changeTime()
    },false)
    overBtn.ontouchend = function () {
        phoneBox.style.transform = 'translateY(110%)'
        // chatBoxFn()
        phoneBox.addEventListener('transitionend', function (e) {
            console.log(e)
            chatBoxFn()
            say.pause()
            claerFn()
            bgm.play()
        }, false)
    }
    function changeTime(){
        let timer = setInterval(()=>{
            // say.currentTime
            let t = parseInt(say.currentTime)
            timeBox.innerHTML = `00:${t<10?'0'+t:t}`
            if(say.ended){
                clearInterval(timer)
                phoneBox.style.transform = 'translateY(110%)'
                chatBoxFn()
                bgm.play()
            }
        },1000)
        return function(){
            clearInterval(timer)
        }
    }
}

function chatBoxFn() {
    let chatMsgBox = document.querySelector('.chatBox .chatMsgBox')
    let olis = document.querySelectorAll('.chatBox ul li')
    let keyboard = document.querySelector('.chatBox .keyboard')
    let p = keyboard.querySelector(' p')
    let chatBtn = keyboard.querySelector('.chatBtn')
    let timer = null, n = 0//记录显示的条数
    timer = setInterval(() => {
        olis[n].classList.remove('opa')
        n++
        if (n == 3) {
            clearInterval(timer)
            setTimeout(() => {
                keyboard.classList.remove('bot')

            }, 1000)
            setTimeout(() => {
                input()
            }, 1400)
        }
    }, 1000)

    function input() {
        var str = '我们现在使用的是VUE和REACT';
        let n = 0
        let timer = null
        timer = setInterval(() => {
            p.innerHTML += str[n]
            n++
            if (n >= str.length) {
                clearInterval(timer)
                chatBtn.classList.remove('hide')
            }
        }, 100)


    }
    chatBtn.ontouchend = function () {
        p.innerHTML = ''
        keyboard.classList.add('bot')
        olis[n].classList.remove('opa')
        n++
        timer = setInterval(() => {
            olis[n].classList.remove('opa')
            move()
            n++
            if (n === olis.length) {
                clearInterval(timer)
            }
        }, 1000)
    }
    let t = 0
    function move() {
        let h = olis[n].clientHeight
        t += h
        chatMsgBox.style.transform = `translateY(-${t}px)`
    }
}
