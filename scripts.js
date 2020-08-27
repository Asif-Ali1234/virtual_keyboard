
var main=null,keys=[],keyscontainer=null,value="",capslock=false

var eventhandlers={
    oninput:null,
    onclose:null
}

var textarea=document.getElementById('tarea')

function init(){

    var maindiv=document.getElementById('doccontainer')

    main=document.createElement('div')

    keyscontainer=document.createElement('div')

    main.classList.add('keyboard','keyboard--hidden')

    keyscontainer.classList.add('keyboard--keys')

    keyscontainer.appendChild(createui())


    var closing=document.createElement('span')

    closing.innerHTML=create_icon('close')

    closing.classList.add('closingbutton')
    closing.addEventListener('click',()=>{
        close_keyboard()
    })

    keyscontainer.appendChild(closing)

    keys=keyscontainer.querySelectorAll('.keyboardkey')

    main.appendChild(keyscontainer)

    maindiv.appendChild(main)

    textarea.addEventListener('focus',() =>{
            open_keyboard(textarea.value)
    })
}

function createui(){
    keylayout=['1','2','3','4','5','6','7','8','9','0','backspace','br',
        'q','w','e','r','t','y','u','i','o','p','br',
        'keyboard_capslock','a','s','d','f','g','h','j','k','l','enter','br',
        'done','z','x','c','v','b','n','m',",",".","?",'br',
        'space_bar'
    ]
    var fragment=document.createDocumentFragment()
    keylayout.forEach(key => {
        var button=document.createElement('button')
        button.type="button"
        button.classList.add('keyboardkey')
        switch(key){
            case 'backspace':
                var icon=create_icon('backspace')
                button.innerHTML=icon
                button.classList.add('backspacekey')
                button.addEventListener('click',function(){
                    textarea.focus()
                    value=value.substring(0,value.length-1)
                    textarea.value=value
                })
            break
            case 'keyboard_capslock':
                var icon=create_icon('keyboard_capslock')
                button.innerHTML=icon
                button.classList.add('backspacekey','capslock')
                button.addEventListener('click',function(){
                    togglecapslock()
                    button.classList.toggle('activecapslock',capslock)
                    textarea.focus()
                })
            break
            case 'enter':
                var icon=create_icon('keyboard_return')
                button.innerHTML=icon
                button.classList.add('backspacekey')
                button.addEventListener('click',function(){
                    value+="\n";
                    textarea.value=value
                    textarea.focus()
                })
            break
            case 'done':
                var icon=create_icon('check_circle')
                button.innerHTML=icon
                button.classList.add('backspacekey','checkcircle')
                button.addEventListener('click',function(){
                    close_keyboard()
                })
            break
            case 'br':
                button=document.createElement('br')
            break
            case 'space_bar':
                var icon=create_icon('space_bar')
                button.innerHTML=icon
                button.classList.add('spacebarkey')
                button.addEventListener('click',function(){
                    value+=" "
                    textarea.value=value
                    textarea.focus()
                })
            break
            default:
                button.textContent=key.toLowerCase()
                button.addEventListener('click',function(){
                    value+=capslock?key.toUpperCase():key.toLowerCase()
                    textarea.value=value
                    textarea.focus()
                })
        }
        fragment.appendChild(button)
    });

    return fragment
}

function create_icon(icon_name){
    return `<i class="material-icons">${icon_name}</i>`
}

function togglecapslock(){
    capslock=!capslock

    keys.forEach(key => {
        if(key.childElementCount === 0){
            key.textContent=capslock?key.textContent.toUpperCase():key.textContent.toLowerCase()
        }
    });
}

function open_keyboard(initialvalue){
    value=initialvalue || ""
    main.classList.remove('keyboard--hidden')
}

function close_keyboard(){
    main.classList.add('keyboard--hidden')
    value=""
}

window.addEventListener('DOMContentLoaded',function(){
    init()
})