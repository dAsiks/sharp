knifesDo()
sharpenerDo()
function knifesDo() {
    fetch("https://d9ac13a3907ebf3a.mokky.dev/knifes").then(response => response.json()).then(data =>{
    function writeProductionKnifes() {
        const knifes = document.getElementById('knifes')
        knifes.innerHTML = ""
        let a = 0
            for (let i = 0; i < 21; i++) {
            const kn = data[i]
            const name = kn.name
            const description = kn.description
            const price = kn.price
            //console.log(name, description, price);
            //
            if (a>=5) {
                a=0
            }
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
            for (let i = 0; i < 21; i++) {
            const kn = data[i]
            const name = kn.name
            const description = kn.description
            const price = kn.price
            //console.log(name, description, price);
            //
            if (a>=5) {
                a=0
            }
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
                    console.log(name);
                    saveProduction(name)
                }
            });
        }
    );
}
let n = localStorage.length
function saveProduction(name) {
    localStorage.setItem(n, name)
    n++
}