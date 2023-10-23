

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

const random(){ 
   document.getElementById('atk_before').value = 5;
  
}
  
}


