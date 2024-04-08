knifesDo()
sharpenerDo()
function knifesDo() {
    fetch("https://d9ac13a3907ebf3a.mokky.dev/knifes").then(response => response.json()).then(data =>{
    function writeProductionKnifes() {
        console.log(2);
        const knifes = document.getElementById('knifes')
        knifes.innerHTML = ""
        let a = 0
            for (let i = 0; i < 3; i++) {
            const kn = data[i]
            const name = kn.name
            const description = kn.description
            const price = kn.price
            //console.log(name, description, price);
            //
            const img = `../img/knifes/image ${a}.png`
            const knifeItem = document.createElement('div');
            knifeItem.classList.add('knifeItem');
            //
            knifeItem.innerHTML = `
            <div class="none">
                <img class="img" src="${img}" alt="Knife Icon">
                <div class="textKnifes">
                    <div class="text1">
                        <h3 class="h3">${name}</h3>
                        <p class="p">${description}</p>
                    </div>
                    <button class="btn1"  onclick="modal(event, $)">${price} $</button>
                </div>
            </div>
            `;
            a++
            knifes.append(knifeItem);
        }
    }
    writeProductionKnifes()
    
}).catch(error => {console.error('Error fetching data:', error);});
}
function sharpenerDo() {
    fetch("https://d9ac13a3907ebf3a.mokky.dev/sharpener").then(response => response.json()).then(data =>{
    //console.log(data);
    function writeProductionKnifes() {
        const knifes = document.getElementById('sharpeners')
        knifes.innerHTML = ""
        let a = 0
            for (let i = 0; i < 3; i++) {
            const kn = data[i]
            const name = kn.name
            const description = kn.description
            const price = kn.price
            //console.log(name, description, price);
            //
            const img = `../img/sharpener/image ${a}.png`
            const knifeItem = document.createElement('div');
            knifeItem.classList.add('knifeItem');
            //
            knifeItem.innerHTML = `
            <div class="none"  onclick="modal(event)">
                <img class="img" src="${img}" alt="Knife Icon">
                <div class="textKnifes">
                    <div class="text1">
                        <h3 class="h3">${name}</h3>
                        <p class="p">${description}</p>
                    </div>
                    <button class="btn1" onclick='modal(event, $)'>${price} $</button>
                </div>
            </div>
            `;
            a++
            knifes.append(knifeItem);
        }
    }
    writeProductionKnifes()
}).catch(error => {console.error('Error fetching data:', error);});
}
function modal(event, $) {
    console.log(event.target);
        $('.btn1').click(
            function() {
                Swal.fire({
                    title: $(this).closest('.none').find('.h3').html(),
                    text: $(this).closest('.none').find('.p').html() + " " + $(this).closest('.none').find('.btn1').html(), 
                    imageUrl: $(this).closest('.none').find('.img').attr('src'),
                    imageWidth: 400,
                    imageHeight: 400,
                    imageAlt: "Custom image", 
                    showCancelButton: true,
                    confirmButtonText: "В корзину", 
                    cancelButtonText: "Отмена",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire("В корзине!", "", "success");
                      let name = $(this).closest('.none').find('.h3').html()
                      console.log("в корзину");
                      saveProduction(name)
                      setTimeout(reload, 1000)
                      };
                      
                })
}
)}
let k = localStorage.length
function saveProduction(name) {
    localStorage.setItem(k, name)
    k++
}
function delet() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Вы уверены?",
        text: "Вы не сможете отменить это дейтсвие!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "очистить",
        cancelButtonText: "сохранить",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            console.log("clear");
            localStorage.clear()
            document.getElementById("btns").classList.add("dele");
            const knifes = document.getElementById('veshi')
            knifes.innerHTML = `<h1 id="del">Пока здесь пусто!</h1> `
          swalWithBootstrapButtons.fire({
            title: "Очищено!",
            text: "Ваша корзина чиста.",
            icon: "success"
          });
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Отменено",
            text: "Ваш корзина не очищена :)",
            icon: "error"
          });
        }
      });
}
function delVesh1($) {
    $('.btn1').click(
        function() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Вы уверены?",
        text: "Вы хотите удалить эту вещь?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "удалить",
        cancelButtonText: "сохранить",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            for (let i = 0; i<= localStorage.length; i++) {
                console.log(localStorage.getItem(i) );
                if (localStorage.getItem(i) == $(this).closest(".none").find(".h3").html()) {
                    localStorage.removeItem(i)
                }
            }
            if (localStorage.length == 0) {
                document.getElementById("btns").classList.remove("dele");
            }
            console.log("clear");
            setTimeout(reload, 1000)
          swalWithBootstrapButtons.fire({
            title: "Готово!",
            text: "Эта вещь удалена.",
            icon: "success"
            
          });
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Отменено",
            text: "Эта вещь осталась на месте :)",
            icon: "success"
          });
        }
      });
    })
}
function reload() {
    location.reload();
}
function gotovo() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn4 btn-success",
          cancelButton: "btn2 btn-danger"
        },
        buttonsStyling: false
      });
      console.log(num);
      swalWithBootstrapButtons.fire({
        title: "Вы готовы?",
        text: `Вы готовы оформить заказ на сумму ${num} $?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "оформить",
        cancelButtonText: "отмена",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            setTimeout(reload, 2000)
            console.log("clear");
            localStorage.clear()
            document.getElementById("btns").classList.add("dele");
            const knifes = document.getElementById('veshi')
            knifes.innerHTML = `<h1 id="del">Пока здесь пусто!</h1> `
            swalWithBootstrapButtons.fire({
                title: `Оформление заказа на сумму ${num} $`,
            timer: 2000,
            timerProgressBar: true,
          });
          
        } 
      })
}
writeProduction(localStorage)
let num = 0
function writeProduction(names) {
    console.log(localStorage);
    if (localStorage.length > 0) {
        fetch("https://d9ac13a3907ebf3a.mokky.dev/knifes").then(response => response.json()).then(data =>{
        for (let y = 0; y < names.length; y++) {
            let a = 0
            const knifes = document.getElementById('veshi')
            const del = document.getElementById('del')
            del.innerHTML = ""
            for (let i = 0; i <= 21; i++) {
                let kn = data[i]
                if (kn.name == names[y]){
                    document.getElementById("btns").classList.remove("dele");
                    const name =  kn.name
                    const description = kn.description
                    const price = kn.price
                    num += Number(price)
                        //console.log(name, description, price);
                        //
                    const img = `../img/knifes/image ${a}.png`
                    const veshiItem = document.createElement('div');
                    veshiItem.classList.add('knifeItem');
                        //
                    veshiItem.innerHTML = `
                    <div class="none">
                        <img class="img" src="${img}" alt="Knife Icon">
                        <div class="textKnifes">
                            <div class="text1">
                                <h3 class="h3">${name}</h3>
                                <p class="p">${description}</p>
                            </div>
                            <button class="btn1"  onclick="delVesh1($)">${price} $</button>
                        </div>
                    </div>
                    `;
                    if (a == 5) {
                        a = 0
                    }
                    
                    knifes.append(veshiItem);
                }
                a++
            }
        }
    })
    fetch("https://d9ac13a3907ebf3a.mokky.dev/sharpener").then(response => response.json()).then(data =>{
        for (let y = 0; y < names.length; y++) {
            let a = 0
            const knifes = document.getElementById('veshi')
            const del = document.getElementById('del')
            del.innerHTML = ""
            for (let i = 0; i <= 21; i++) {
                let kn = data[i]
                if (kn.name == names[y]){
                    document.getElementById("btns").classList.remove("dele");
                    const name =  kn.name
                    const description = kn.description
                    const price = kn.price
                    num += Number(price)
                        //console.log(name, description, price);
                        //
                    const img = `../img/sharpener/image ${a}.png`
                    const veshiItem = document.createElement('div');
                    veshiItem.classList.add('knifeItem');
                        //
                    veshiItem.innerHTML = `
                    <div class="none">
                        <img class="img" src="${img}" alt="Knife Icon">
                        <div class="textKnifes">
                            <div class="text1">
                                <h3 class="h3">${name}</h3>
                                <p class="p">${description}</p>
                            </div>
                            <button class="btn1"  onclick="delVesh1($)">${price} $</button>
                        </div>
                    </div>
                    `;
                    if (a == 5) {
                        a = 0
                    }
                    
                    knifes.append(veshiItem);
                }
                a++
            }
        }
        console.log(num);
    })
    }
    else if(localStorage.length == 0){
        document.getElementById("btns").classList.add("dele");
        return
    }
    
}
