
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
  document.getElementById('add_atk_after').innerText = "0";
  document.getElementById('add_critchance_after').innerText ="0";
  document.getElementById('add_critdmg_after').innerText ="0";
  document.getElementById('add_spd_after').innerText  ="0";
  restoreBtn.disabled = true;
 
  
}

function random(){ 
  
   document.getElementById('atk_before').value = 4 + Math.floor(Math.random()*5);
   document.getElementById('critchance_before').value = 3 + Math.floor(Math.random()*3);
   document.getElementById('critdmg_before').value = 4 + Math.floor(Math.random()*4);
   const spdFive=Math.floor(Math.random()*1000)
   if(spdFive > 3){
   document.getElementById('spd_before').value = 2 + Math.floor(Math.random()*3);
   }else{
   document.getElementById('spd_before').value = 5;  
   }
   
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
  document.getElementById('add_atk_after').innerText ="0";
  document.getElementById('add_critchance_after').innerText="0";
  document.getElementById('add_critdmg_after').innerText="0";
  document.getElementById('add_spd_after').innerText ="0";
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
         document.getElementById('num').innerText = num.toString();
         let atk_after = Number(document.getElementById('atk_after').innerText);
         let add_atk_before= Number(document.getElementById('add_atk_after').innerText);
         let add_atk_after = 4 + Math.floor(Math.random()*5)
          
         atk_after =  atk_after + add_atk_after;
         add_atk_before = add_atk_before+add_atk_after;
         document.getElementById('atk_after').innerText = atk_after.toString() ;
         document.getElementById('add_atk_after').innerText = add_atk_before.toString() ;
         break;
     case 1:
         b=b+1;
         num = num + 3;
         document.getElementById('num').innerText = num.toString();
         let critchance_after = Number(document.getElementById('critchance_after').innerText);
         let add_critchance_before= Number(document.getElementById('add_critchance_after').innerText);
         let add_critchance_after = 3 + Math.floor(Math.random()*3);
       
         critchance_after =  critchance_after + add_critchance_after;
         add_critchance_before = add_critchance_before+add_critchance_after;
         document.getElementById('critchance_after').innerText = critchance_after.toString();
         document.getElementById('add_critchance_after').innerText = add_critchance_before.toString() ;
         break;
     case 2:
         c=c+1;
         num = num + 3;
         document.getElementById('num').innerText = num.toString();
         let critdmg_after = Number(document.getElementById('critdmg_after').innerText);
         let add_critdmg_before= Number(document.getElementById('add_critdmg_after').innerText);
         let add_critdmg_after = 4 + Math.floor(Math.random()*4);
       
         critdmg_after =  critdmg_after + add_critdmg_after;
         add_critdmg_before = add_critdmg_before+add_critdmg_after;
         document.getElementById('critdmg_after').innerText = critdmg_after.toString();
         document.getElementById('add_critdmg_after').innerText = add_critdmg_before.toString() ;
         break;
     case 3:
         d=d+1;
         num = num + 3;
         document.getElementById('num').innerText = num.toString();
         let spd_after = Number(document.getElementById('spd_after').innerText);
         let add_spd_before= Number(document.getElementById('add_spd_after').innerText);
         let add_spd_after = 0;
         const spdFive=Math.floor(Math.random()*1000)
            if(spdFive > 3){
                add_spd_after = 2 + Math.floor(Math.random()*3);
            }else{
                add_spd_after = 5;
            }
         spd_after = spd_after + add_spd_after;
         add_spd_before = add_spd_before+add_spd_after;
         document.getElementById('spd_after').innerText = spd_after.toString();
         document.getElementById('add_spd_after').innerText = add_spd_before.toString();
         break;
       
   }
     console.log(num);
     if(num==15){
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
         let add_atk_before= Number(document.getElementById('add_atk_after').innerText);
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
         add_atk_before = add_atk_before + add_atk;
         document.getElementById('atk_after').innerText = atk_after.toString();
         document.getElementById('add_atk_after').innerText = add_atk_before.toString();
  
         let critchance_after = Number(document.getElementById('critchance_after').innerText);
         let add_critchance_before= Number(document.getElementById('add_critchance_after').innerText);
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
         add_critchance_before = add_critchance_before+add_critchance;
         document.getElementById('critchance_after').innerText = critchance_after.toString();
         document.getElementById('add_critchance_after').innerText = add_critchance_before.toString();
  
         let critdmg_after = Number(document.getElementById('critdmg_after').innerText);
         let add_critdmg_after= Number(document.getElementById('add_critdmg_after').innerText);
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
         add_critdmg_before = add_critdmg_before+add_critdmg;
  
         document.getElementById('critdmg_after').innerText = critdmg_after.toString();
         document.getElementById('add_critdmg_after').innerText = add_critdmg_before.toString();
  
         let spd_after = Number(document.getElementById('spd_after').innerText);
         let add_spd_after= Number(document.getElementById('add_spd_after').innerText);
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
         add_spd_before = add_spd_before+add_spd;
         document.getElementById('spd_after').innerText = spd_after.toString();
         document.getElementById('add_spd_after').innerText = add_spd_before.toString();
         restoreBtn.disabled = true;

  }
