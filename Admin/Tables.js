let link = location.href,
    AllInputs = $('input'),
    HeaderDiv = $('.headerDiv')[0],
    pageBtnsDiv = HeaderDiv.lastElementChild,
    type = link.slice(link.lastIndexOf('=') + 1),
    last_click;

 vue = new Vue({
  el: '#Table',
  data: {
    list: [
      
    ],

    btnsFunc: function () {
      
      let inp_child = Array.from(event.target.parentNode.children),
          IterDivs = Array.from(vue.$el.children),
          opisanie = event.target.parentNode.previousElementSibling,
          current_IterDiv = event.target.parentNode
                                     .parentNode
                                     .parentNode
                                     .parentNode,
          price_h5 = opisanie.lastElementChild,
          current_list = vue.list[IterDivs.indexOf(current_IterDiv)];
      

      if ( inp_child.indexOf(event.target) === 0 )
      {
        str = `Выберите цифру:
        1. Назначить цену
        2. Добавить или убрать скидку`;

        num = +prompt(str);

        if (num === 1)
        {
          price = +prompt('Введите цену');

          if (price <= 0 || isNaN(price)) return;

          $.ajax({
            method: 'POST',
            url: './Admin_Tools/btnsTableData.php',
            data: {price: price, list: current_list},
            success: function (arg) {
              str = price_h5.innerText;
              
              price_h5.innerText = str.slice(0, str.indexOf(' ') + 1) + 
                                   price.toLocaleString() + ' Руб';
            }
          })
        }

        if (num === 2)
        {
          num = +prompt('Введите процент скидки');

          if ( num < 0 || num > 100 || isNaN(num) ) return;
          
          discount = num;

          price = price_h5.innerText;
          price = price.slice(price.indexOf(':') + 2, price.lastIndexOf(' '));
          price = +price.replaceAll(String.fromCharCode(160), '');
          
          price = ( price - (price * (num /= 100)) ).toLocaleString();

          if (discount > 0)
          {
            price_h5.innerText = `Цена: ${price} руб (с учётом скидки)`;
          }

          clock_id = vue.list[vue.list.length - 1].id;
          

          $.ajax({
            method: 'POST',
            url: './Admin_Tools/btnsTableData.php',
            data: {discount: discount, list: current_list},
            success: function (arg) {

              if (arg.length !== 0)
              {
                arg = parseFloat(JSON.parse(arg));
                price_h5.innerText = `Цена: ${arg.toLocaleString() + ' руб'}`;
              }
              else return;
            }
          })
        }
      }

      if ( inp_child.indexOf(event.target) === 1 )
      {
        $.ajax({
          method: "POST",
          url: './Admin_Tools/btnsTableData.php',
          data: {list: current_list, del: true},
          success: function (arg) {
            ind = vue.list.indexOf(current_list);
            vue.list.splice(ind, 1);
          }
        })
      }
    }
  }
}) 

function AddEvent()
{
  
}

function RenderClock()
{
  
  if (last_click === this.value) return;

  last_click = this.value;

  $.ajax({
    method: 'POST',
    url: './Admin_Tools/GetTableData.php',
    data: {type: 'tovary', offset: (+this.value - 1) * 50},
    success: function(arg) {

      arg = JSON.parse(arg);

      if (vue.list.length !== 0) vue.list.length = 0;

      for (let i = 0; i < arg.length; i++)
      {
        clock = arg[i];

        if (clock[clock.length - 1] === '' || clock[clock.length - 1] === null)
        {
          price = (+(clock[8])).toLocaleString() + ' руб';
        }
        else
        {
          discount = parseFloat(clock[clock.length - 1]) / 100;
          price = +clock[8] - (+clock[8] * discount);
          price = price.toLocaleString() + ' руб (с учётом скидки)';
        }

        if (clock[15] === '' || clock[15] === null) clock[15] = "нет тегов";

        ClockObj = {
          id: clock[0],
          imgSrc: clock[10],
          clockName: clock[12] + ` ${clock[3]}`,
          price: price,
          character: clock[9],
          tag: clock[15],
        }

        vue.list.push(ClockObj);
      }

    }
  })
}

function CheckCount()
{

  $.ajax({
    method: 'POST',
    url: './Admin_Tools/GetTableData.php',
    data: {type: 'count', GetT: type},
    success: function (arg) {
      let count = +arg,
          pages = Math.ceil(count / 50);

      if (pages === 1) return;

      for (let i = 1; i <= pages; i++)
      {
        inp = document.createElement('input');
        inp.type = 'button';
        inp.value = i;
        inp.addEventListener('click', RenderClock);
        inp.classList.add('pageBtns')

        if (inp.value === '1') inp.click();

        pageBtnsDiv.appendChild(inp);
      }
    }
  })
}

function GetDataTable()
{
  console.log(type);

  if (type === 'tovary')
  {
    AllInputs.on('click', RenderClock);
  }

  if (type === 'users')
  {
    
  }

  if (type === 'orders')
  {
    
  }
}


GetDataTable();
CheckCount();
AddEvent();

console.log(vue.$el.children);