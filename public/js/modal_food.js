function openModelFood() {
  const addFood = document.querySelectorAll('.food__iconAddFood');
  const modalFood = document.querySelector('.modal.text');
  const iconCloseModel = document.querySelector('.modal__icon.text');

  const modalCategories = document.querySelector('.modal_BodyCategories');

  // foods
  const modalFoodCard = document.querySelector('.modal__foods');
  const foodTitle = document.querySelector('.modal__foodsTitle');
  const foodCard = document.querySelector('.modal__foodsCards')

  let buaId;
  addFood.forEach(function (btnAddFood) {

    btnAddFood.addEventListener("click", openModel);

  });

  iconCloseModel.addEventListener("click", closeModel);

  function openModel(e) {
    const categories = document.querySelectorAll('.modal__category');
    buaId = e.currentTarget.dataset.bua;
    console.log('bua an', buaId);

    categories.forEach(function (category) {
      category.addEventListener('click', openFoodsByCategory);
    });
    let foods;


    modalFood.classList.add('open');
    document.querySelector('body').style.overflow = "hidden";

    async function openFoodsByCategory(e) {
      const btnBackCategories = document.querySelector('.categoriesFood');

      const nameCategory = e.currentTarget.dataset.category;
      let quantity = 1;

      await $.ajax({
        url: `/category/food`,
        method: 'POST',
        data: {
          category: nameCategory
        },
        success: function (data) {
          console.log('data1 ', data.foods);
          foods = data.foods;
        }
      });

      btnBackCategories.addEventListener('click', function (e) {
        modalCategories.style.display = "block";
        modalFoodCard.style.display = "none";
      })

      const search = document.querySelector('.searchFood');
      const btnSearch = document.querySelector('.btnSearch');

      let tmpFoods = foods;

      btnSearch.addEventListener('click', function (e) {
        let valueSearch = search.value.trim();
        console.log('search', valueSearch);
        if (valueSearch) {
          tmpFoods = [];
          foods.forEach(function (food) {
            console.log('text', food.name.toLowerCase(), valueSearch.toLowerCase())
            if (food.name.toLowerCase().includes(valueSearch.toLowerCase())) {
              tmpFoods.push(food);
            }
          })
          foodCard.innerHTML = '';
          loadFoods(tmpFoods);
          if (tmpFoods.length === 0) {
            foodCard.innerHTML = 'Không tìm thấy đồ ăn nào!';
          }
        } else {
          foodCard.innerHTML = '';
          loadFoods(foods);
        }

      })

      foodTitle.innerHTML = `Danh sách đồ ăn thuộc loại ${nameCategory}`
      loadFoods(foods);


      modalCategories.style.display = "none";
      modalFoodCard.style.display = "block";

      function loadFoods(foods) {

        foods.forEach(function (food) {

          let templateFood = `
          <div class="modal__foodsCard" 
          >
          
            <div class="modal__foodsCardName" >${food.name}</div>
            <div class="modal__foodsCardUnit" >
              <input type="number" id="quantity-${food._id}" value="1" class="modal__foodsCardInput" name="quantity" min="1" max="1000" /> 
              <!-- <div class="modal__foodsCardFormInput">
                <span class="quanti-invitati-op-${food._id}" data-op="-1">-</span>
                <input class="quanti-${food._id}" type="number" value="2" min="1">
                <span class="quanti-invitati-op-${food._id}" data-op="1">+</span>
              </div> -->
              x ${food.unit}
            </div>
            <div class="modal__foodsCardInfo" >
                <div class="modal__foodsCardCal info _${food._id}" >Cal: ${food.cal}</div>
                <div class="modal__foodsCardProtein info _${food._id}" >Protein: ${food.protein}</div>
                <div class="modal__foodsCardFat info _${food._id}" >Fat: ${food.fat}</div>
                <div class="modal__foodsCardCarb info _${food._id}" >Carb: ${food.carb}</div>
            </div>
            <button class="modal__foodsCardBtn"
              data-id="${food._id}" 
              data-name="${food.name}"
              data-unit="${food.unit}"
              data-cal="${food.cal}"
              data-protein="${food.protein}"
              data-fat="${food.fat}"
              data-carb="${food.carb}"
            >Thêm món ăn</button>
            <img class="demo-bg"
            src="assets/images/fast-food.jpeg"
            alt="">
          </div>
          `
          foodCard.insertAdjacentHTML("beforeend", templateFood);

          const cal = document.querySelector(`.modal__foodsCardCal.info._${food._id}`);
          const fat = document.querySelector(`.modal__foodsCardFat.info._${food._id}`);
          const protein = document.querySelector(`.modal__foodsCardProtein.info._${food._id}`);
          const carb = document.querySelector(`.modal__foodsCardCarb.info._${food._id}`);


          $(`#quantity-${food._id}`).bind("change paste keyup", function () {
            // console.log($(this).val());
            quantity = $(this).val();
            cal.innerHTML = `Cal: ${Number.parseFloat(food.cal * quantity).toFixed(1)}`;
            protein.innerHTML = `Protein: ${Number.parseFloat(food.protein * quantity).toFixed(1)}`;
            fat.innerHTML = `Fat:${Number.parseFloat(food.fat * quantity).toFixed(1)}`;
            carb.innerHTML = `Carb: ${Number.parseFloat(food.carb * quantity).toFixed(1)}`;
          });

        });

        document.querySelectorAll('.modal__foodsCardBtn').forEach(function (food) {
          food.addEventListener('click', addFoodToForm);
        });
        function addFoodToForm(e) {
          const idFood = e.currentTarget.dataset.id;
          const name = e.currentTarget.dataset.name;
          const unit = e.currentTarget.dataset.unit;
          const cal = e.currentTarget.dataset.cal;
          const protein = e.currentTarget.dataset.protein;
          const fat = e.currentTarget.dataset.fat;
          const carb = e.currentTarget.dataset.carb;
          if (+quantity > 0) {
            $.ajax({
              url: '/food-form',
              method: 'POST',
              data: {
                idFood,
                category: nameCategory,
                name,
                unit,
                cal,
                protein,
                fat,
                carb,
                quantity,
                buaId,
              },
              success: function (data) {
                if (data.success) {
                  location.reload();
                }
              }
            })
          }
        }
      }

    }

  }

  function closeModel(e) {
    modalFood.classList.remove('open');
    document.querySelector('body').style.overflow = "initial";
  }
}

openModelFood();

function deleteFoodInForm() {
  const btnDelete = document.querySelectorAll('.food_cardDelete');
  btnDelete.forEach(function (item) {
    item.addEventListener('click', function (e) {
      const idFoodForm = e.currentTarget.dataset.id;

      $.ajax({
        url: `/food-form/${idFoodForm}`,
        method: 'DELETE',
        success: function (data) {
          if (data.success) {
            location.reload();
          }
        }
      })
    })
  })
}

deleteFoodInForm()

function computeForm() {
  const btnCalcul = document.querySelector('.food__calculBtn');

  const foodsInForm = document.querySelectorAll('.food__cardItem');

  const notification = document.querySelector('.food_notification');
  const result = document.getElementById('resultCalcul');
  // const loading = document.getElementById('loading');

  const valueTarget = document.querySelector('.valueTarget');
  const valueAte = document.querySelector('.valueAte');
  const valueRest = document.querySelector('.valueRest');
  const nameRest = document.querySelector('.nameRest');

  let totalCacul = 0;
  let totalCalFood = 0;
  foodsInForm.forEach(function (food) {
    const cal = food.dataset.cal;
    const quantity = food.dataset.quantity;
    totalCalFood = +Number.parseFloat(totalCalFood + (cal * quantity)).toFixed(1);
  })
  // console.log('total food', totalCalFood);
  valueAte.innerHTML = totalCalFood;

  totalCacul = valueTarget.dataset.target || 0;
  let diff = Number.parseFloat(totalCacul - totalCalFood).toFixed(1);
  if (diff < 0) {
    nameRest.innerHTML = "Vượt quá";
    valueRest.style.color = 'red';
    diff = -diff;
  } else {
    nameRest.innerHTML = "Còn lại ";
    valueRest.style.color = 'black';
  }
  valueRest.innerHTML = diff;

  btnCalcul.addEventListener('click', function (e) {
    const age = document.getElementById('age').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');
    const weight = document.getElementById('weight').value.trim();
    const height = document.getElementById('height').value.trim();
    const activity = document.getElementById('activities').value;
    const totalCalories = document.getElementById('total-calories');


    if (age === '' || weight === '' || height === '' || 80 < age || age < 15) {
      notification.style.display = 'block';
      result.style.display = 'none';
      setTimeout(function () {
        notification.style.display = 'none';
      }, 2000);
      return;
    } else if (gender.id === 'male' && activity === "1") {
      totalCacul = Number.parseFloat(1.2 * (66.5 + (13.75 * parseFloat(weight)) + (5.003 * parseFloat(height)) - (6.755 * parseFloat(age)))).toFixed(1);
    } else if (gender.id === 'male' && activity === "2") {
      totalCacul = Number.parseFloat(1.375 * (66.5 + (13.75 * parseFloat(weight)) + (5.003 * parseFloat(height)) - (6.755 * parseFloat(age)))).toFixed(1);
    } else if (gender.id === 'male' && activity === "3") {
      totalCacul = Number.parseFloat(1.55 * (66.5 + (13.75 * parseFloat(weight)) + (5.003 * parseFloat(height)) - (6.755 * parseFloat(age)))).toFixed(1);
    } else if (gender.id === 'male' && activity === "4") {
      totalCacul = Number.parseFloat(1.725 * (66.5 + (13.75 * parseFloat(weight)) + (5.003 * parseFloat(height)) - (6.755 * parseFloat(age)))).toFixed(1);
    } else if (gender.id === 'male' && activity === "5") {
      totalCacul = Number.parseFloat(1.9 * (66.5 + (13.75 * parseFloat(weight)) + (5.003 * parseFloat(height)) - (6.755 * parseFloat(age))).toFixed(1))
        ;
    } else if (gender.id === 'female' && activity === "1") {
      totalCacul = Number.parseFloat(1.2 * (655 + (9.563 * parseFloat(weight)) + (1.850 * parseFloat(height)) - (4.676 * parseFloat(age)))).toFixed(1);
    } else if (gender.id === 'female' && activity === "2") {
      totalCacul = Number.parseFloat(1.375 * (655 + (9.563 * parseFloat(weight)) + (1.850 * parseFloat(height)) - (4.676 * parseFloat(age)))).toFixed(1);
    } else if (gender.id === 'female' && activity === "3") {
      totalCacul = Number.parseFloat(1.55 * (655 + (9.563 * parseFloat(weight)) + (1.850 * parseFloat(height)) - (4.676 * parseFloat(age)))).toFixed(1);
    } else if (gender.id === 'female' && activity === "4") {
      totalCacul = Number.parseFloat(1.725 * (655 + (9.563 * parseFloat(weight)) + (1.850 * parseFloat(height)) - (4.676 * parseFloat(age)))).toFixed(1);
    } else {
      totalCacul = Number.parseFloat(1.9 * (655 + (9.563 * parseFloat(weight)) + (1.850 * parseFloat(height)) - (4.676 * parseFloat(age)))).toFixed(1);
    }

    $.ajax({
      url: '/user/calo',
      method: 'PUT',
      data: {
        caloTarget: totalCacul,
      },
      success: function (data) {
        if (data.success) {
          valueTarget.innerHTML = totalCacul;
          totalCalories.innerHTML = totalCacul;
          let diff = Number.parseFloat(totalCacul - totalCalFood).toFixed(1);
          if (diff < 0) {
            nameRest.innerHTML = "Vượt quá";
            valueRest.style.color = 'red';
            diff = -diff;
          } else {
            nameRest.innerHTML = "Còn lại ";
            valueRest.style.color = 'black';
          }
          valueRest.innerHTML = diff;
          result.style.display = 'block';
        }
      }
    })

    // loading.style.display = 'none';
  })
}

computeForm()


