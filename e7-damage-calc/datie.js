
a=0;
b=0;
c=0;
d=0;
const addThreeBtn = document.getElementById('addThreeBtn');
const addFifteenBtn = document.getElementById('addFifteenBtn');
const restoreBtn = document.getElementById('restoreBtn');

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
  restoreBtn.disabled = true;
 
  
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
  a=0;
  b=0;
  c=0;
  d=0;
  addThreeBtn.disabled = false;
  addFifteenBtn.disabled = false;
  restoreBtn.disabled = true;
}

function addThree(){ 
   const choice=Math.floor(Math.random()*4);
   let num =  Number(document.getElementById('num').innerText);
   switch(choice){
     case 0:
         a=a+1;
         num = num + 3;
         console.log(num);
         document.getElementById('num').innerText = num.toString();
         let atk_after = Number(document.getElementById('atk_after').innerText);
         atk_after =  atk_after + 4 + Math.floor(Math.random()*5);
         document.getElementById('atk_after').innerText = atk_after.toString();
         break;
     case 1:
         b=b+1;
         num = num + 3;
         document.getElementById('num').innerText = num.toString();
         let critchance_after = Number(document.getElementById('critchance_after').innerText);
         critchance_after =  critchance_after + 3 + Math.floor(Math.random()*3);
         document.getElementById('critchance_after').innerText = critchance_after.toString();
         break;
     case 2:
         c=c+1;
         num = num + 3;
         document.getElementById('num').innerText = num.toString();
         let critdmg_after = Number(document.getElementById('critdmg_after').innerText);
         critdmg_after =  critdmg_after + 4 + Math.floor(Math.random()*4);
         document.getElementById('critdmg_after').innerText = critdmg_after.toString();
         break;
     case 3:
         d=d+1;
         num = num + 3;
         document.getElementById('num').innerText = num.toString();
         let spd_after = Number(document.getElementById('spd_after').innerText);
         spd_after =  spd_after + 2 + Math.floor(Math.random()*3);
         document.getElementById('spd_after').innerText = spd_after.toString();
         break;
       
   }
     if(num=15){
       addThreeBtn.disabled = true;
       addFifteenBtn.disabled = true;
       restoreBtn.disabled = false;
     }
  }
function addFifteen(){ 
   let num =  Number(document.getElementById('num').innerText);  
   num = num / 3;
   for (i=0;i<5-num;i++)
     {
       addThree();
     }
   addThreeBtn.disabled = true;
   addFifteenBtn.disabled = true;
   restoreBtn.disabled = false;
  }
function restore(){ 
         let atk_after = Number(document.getElementById('atk_after').innerText);
         let add_atk = 0;
         switch(a){
           case 0:
           add_atk = 1;
           break;
             
           case 1:
           add_atk = 3;
           break;

           case 2:
           add_atk = 4;
           break;

           case 3:
           add_atk = 5;
           break;

           case 4:
           add_atk = 7;
           break;

           case 5:
           add_atk = 8;
           break;
         }
         atk_after =  atk_after + add_atk;
         document.getElementById('atk_after').innerText = atk_after.toString();
  
         let critchance_after = Number(document.getElementById('critchance_after').innerText);
         let add_critchance = 0;
         switch(b){
           case 0:
           add_critchance = 1;
           break;
             
           case 1:
           add_critchance = 2;
           break;

           case 2:
           add_critchance = 3;
           break;

           case 3:
           add_critchance = 4;
           break;

           case 4:
           add_critchance = 5;
           break;

           case 5:
           add_critchance = 6;
           break;
         }
         critchance_after =  critchance_after + add_critchance;
         document.getElementById('critchance_after').innerText = critchance_after.toString();
  
         let critdmg_after = Number(document.getElementById('critdmg_after').innerText);
         let add_critdmg = 0;
         switch(c){
           case 0:
           add_critdmg = 1;
           break;
             
           case 1:
           add_critdmg = 2;
           break;

           case 2:
           add_critdmg = 3;
           break;

           case 3:
           add_critdmg = 4;
           break;

           case 4:
           add_critdmg = 5;
           break;

           case 5:
           add_critdmg = 6;
           break;
         }
         critdmg_after =  critdmg_after + add_critdmg;
         document.getElementById('critdmg_after').innerText = critdmg_after.toString();
  
         let spd_after = Number(document.getElementById('spd_after').innerText);
         let add_spd = 0;
         switch(d){
           case 0:
           add_spd = 0;
           break;
             
           case 1:
           add_spd = 1;
           break;

           case 2:
           add_spd = 2;
           break;

           case 3:
           add_spd = 3;
           break;

           case 4:
           add_spd = 4;
           break;

           case 5:
           add_spd = 4;
           break;
         }
         spd_after =  spd_after + add_spd;
         document.getElementById('spd_after').innerText = spd_after.toString();
         restoreBtn.disabled = true;

  }
