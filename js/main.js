window.addEventListener('load',(e)=>{
    /**
     * handle show image
     */

    let overlay = document.querySelector('#modal');

    let galleryBtns = document.querySelectorAll('.full-view');
    galleryBtns.forEach(btn=>btn.addEventListener('click',showImage));

    /**
     * 
     * @param {Event} e 
     */
    function showImage(e){
        let el= e.srcElement;
        let parent = el.parentElement.parentElement;
        if (el.classList.contains('full-view')){
            parent = el.parentElement;
        }
        if (parent.classList.contains('full-view')){
            parent = parent.parentElement;
        }
        let imLink = parent.querySelector('img').src
        document.body.style.overflowY = 'hidden';
        overlay.style.zIndex = '1000';

        overlay.querySelector('.img-container img').src = imLink;
        overlay.querySelector('.img-container').classList.remove('hidden')
    }

    overlay.addEventListener('click',(e)=>{
        let overlay = e.srcElement;
        if (overlay.getAttribute('id') == 'modal'){
            overlay.style.zIndex = '-1000';
            document.body.style.overflowY = '';
            overlay.querySelector('.img-container').classList.add('hidden')
        }
    })


    /**
     * scroll to view
     */
    let links = document.querySelectorAll('header nav a');
    links.forEach(link=>link.addEventListener('click',scrollToView))
    /**
     * 
     * @param {Event} e 
     */
    function scrollToView(e){
        e.preventDefault();
        e.stopPropagation();
        let link = e.srcElement;
        document.querySelector(link.getAttribute('href'))
        .scrollIntoView({behavior:'smooth'})
    }

    /**
     * scroll to top button
     * first configure intersection observer
     */
    let scrollBtn = document.querySelector('a.scrollToTop');
    scrollBtn.addEventListener('click',scrollToView)
    var options = {
        root:document.body,
        rootMargin: '10px',
        threshold: [0,0.2,0.4,0.5,1]
    }

    let observer = new IntersectionObserver(observerCallback,options)

    observer.observe(document.querySelector('#about'))
    /**
     * 
     * @param {IntersectionObserverEntry[]} e 
     */
    function observerCallback(e){
        let entry = e[0];
        if(entry.isIntersecting){
            scrollBtn.classList.add('visible')
        }else if(scrollBtn.classList.contains('visible')){
            scrollBtn.classList.remove('visible')
        }
    }

    
})
function showContactMsg(msg,type){
    let types = {
        err:'contact__info err',
        suc:'contact__info succ'
    }
    /**
     * @type {HTMLElement}
     */
    let infBox = document.querySelector('.contact__info');
    document.querySelector('.contact__info span').innerText = msg;
    infBox.style.display = 'block';
    infBox.setAttribute('class',types[type]);
}

function hideConctactMsg(){
    document.querySelector('.contact__info').style.display = 'none';
}