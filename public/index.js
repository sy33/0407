/*

a태그가 있는데 예를 눌렀을때 서버로 요청이 자동으로 보내지는데 이를 막아야함

js 스크립트에서 화면을 변경해야 함.

*/

/*
* 경로에 해당하는 작업을 수행하도록 하는 역할
*@param(경로)url
*/

function router(url){
 if(url =='/'){

 }else if(url ==='/contact'){
    viewContact();
 }else if(url ==='/service'){
    viewService();
 }else if(url ==='/product'){
    viewProduct();
 }else {
    viewNotFound();
 }
}

function viewHome(){
    var root = document.getElementById('root');
    root.innerHTML = '<h1>Home</h1>'
}
function viewContact(){
    var root = document.getElementById('root');
    root.innerHTML = '<h1>Contact</h1>'
}
function viewService(){
    var root = document.getElementById('root');
    root.innerHTML = '<h1>Service</h1>'

    //서버로 요청을 하고
    //데이터를 가지고 와서 화면에 출력.

    ajax('GET', '/services', function(err,res){ // services 는 데이타고 service는 url
        if(err){
            console.log(err);
        }else{
            var obj = JSON.parse(res); // json string -> object
            // JSON.stringify() object -> json string

            for(var i =0; i<obj.result.length; i++){
                var service = obj.result[i];

                servicesHTML+= '<div class="service">'+service.title+'</h1> <p>'+service.content+'</p></div>'
            }
            root.innerHTML = root.innerHTML + servicesHTML;
            // console.log(res);
            // console.log(obj);
        }
    })

}


function viewProduct(){
    var root = document.getElementById('root');
    root.innerHTML = '<h1>Product</h1>'
}
function viewNotFound(){
    var root = document.getElementById('root');
    root.innerHTML = '<h1>NotFound</h1>'
}

function init(){
    document.querySelector('nav').addEventListener('click', function(e){
        if(e.target && e.target.nodeName === 'A'){
            e.preventDefault();
            var path =e.target.getAttribute('href');
                                        
            history.pushState({path: path}, null, path); // 상단url바꿈
            router(path);
        }
    })

    window.onpopstate = function(e){
        if(e.state && e.state.path)
        router(e.state.path)
    }
    //현재 브라우저의 url을 가져와서 route(path);
    // console.log(location.href);
    var path = location.href.split('/')
    console.log(path);
    router('/' +path);

}

init();

function ajax(method, url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.send();  // 이까지 보낸다

    xhr.onreadystatechange = function(){
        if(xhr.readyState === XMLHttpRequest.DONE){ //완료가 됐을때
        if(xhr.status === 200){
            callback(null, xhr.response); //첫번째 null 두번째 response
        }else{
             callback(new Error(xhr.statusText));
        }
    }
}


}

//IO작업(외부와의통신, 시스템 명령어, 타이머...)에 대해서는 비동기
//callback은 함수 콜백 필수로 공부
function workA(){
    
    console.log('완료');

}workA(function(){

});