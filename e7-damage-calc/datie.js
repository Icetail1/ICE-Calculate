

const resolve = () => {
  const atk_before = Number(document.getElementById('atk_before').value);
  const critchance_before = Number(document.getElementById('critchance_before').value);
  const critdmg_before = Number(document.getElementById('critdmg_before').value);
  const spd_before = Number(document.getElementById('spd_before').value);


  const num = 0;

  document.getElementById('num').innerText = num.toString();
  document.getElementById('atk_after').innerText = atk_before.toString();
  document.getElementById('critchance_after').innerText = critchance_before.toString();
  document.getElementById('critdmg_after').innerText = critdmg_before.toString();
  document.getElementById('spd_after').innerText = spd_before.toString();


  
}

function random(){ 
  
   document.getElementById('atk_before').value = 4 + Math.floor(Math.random()*5);
   document.getElementById('critchance_before').value = 3 + Math.floor(Math.random()*3);
   document.getElementById('critdmg_before').value = 4 + Math.floor(Math.random()*4);
   document.getElementById('spd_before').value = 2 + Math.floor(Math.random()*3);
  
  const num = 0;
  const atk_before = Number(document.getElementById('atk_before').value);
  const critchance_before = Number(document.getElementById('critchance_before').value);
  const critdmg_before = Number(document.getElementById('critdmg_before').value);
  const spd_before = Number(document.getElementById('spd_before').value);
  document.getElementById('num').innerText = num.toString();
  document.getElementById('atk_after').innerText = atk_before.toString();
  document.getElementById('critchance_after').innerText = critchance_before.toString();
  document.getElementById('critdmg_after').innerText = critdmg_before.toString();
  document.getElementById('spd_after').innerText = spd_before.toString();

  
}

function addThree(){ 
   const choice=Math.floor(Math.random()*4);
   let num =  Number(document.getElementById('num').value);
   switch(choice){
     case 0:
         num = num + 3;
         document.getElementById('num').innerText = num.toString();
         const atk_before = Number(document.getElementById('atk_before').value);
         const atk_after =  atk_before + 4 + Math.floor(Math.random()*5);
         document.getElementById('atk_after').innerText = atk_after.toString();
     case 1:
         num = num + 3;
         document.getElementById('num').innerText = num.toString();
         const critchance_before = Number(document.getElementById('critchance_before').value);
         const critchance_after =  critchance_before + 3 + Math.floor(Math.random()*3);
         document.getElementById('critchance_after').innerText = critchance_after.toString();
     case 2:
         num = num + 3;
         document.getElementById('num').innerText = num.toString();
         const critdmg_before = Number(document.getElementById('critdmg_before').value);
         const critdmg_after =  critdmg_before + 4 + Math.floor(Math.random()*4);
         document.getElementById('critdmg_after').innerText = critdmg_after.toString();
     case 3:
         num = num + 3;
         document.getElementById('num').innerText = num.toString();
         const spd_before = Number(document.getElementById('spd_before').value);
         const spd_after =  spd_before + 2 + Math.floor(Math.random()*3);
         document.getElementById('spd_after').innerText = spd_after.toString();
       
   }

}
