const dmgConst = 1.871;
const hitTypes = {
  crit: 'crit',
  crush: 'crush',
  normal: 'normal',
  miss: 'miss',
};
const skillTypes = {
  single: 'single',
  aoe: 'aoe',
}



const getSkillType = (skill) => {
  if (skill.single !== undefined && ((typeof skill.single === 'function') ? skill.single() : skill.single) === true) return skillTypes.single;
  if (skill.aoe !== undefined && ((typeof skill.aoe === 'function') ? skill.aoe() : skill.aoe) === true) return skillTypes.aoe;
  return undefined;
}

const resolve = () => {
  const artifact = new Artifact(document.getElementById('artifact').value);
  const hero = new Hero(document.getElementById('hero').value, artifact);

  document.getElementById(`barrier-block`).style.display = 'none';
  document.getElementById(`artifact-dmg-block`).style.display = 'none';
  for (const dotType of [dot.bleed, dot.burn, dot.bomb]) {
    document.getElementById(`${dotType}-damage-block`).style.display = 'none';
  }

  for (const dotType of hero.dot || []) {
    document.getElementById(`${dotType}-damage-block`).style.display = 'inline-block';
    document.getElementById(`${dotType}-damage`).innerText = Math.round(hero.getDotDamage(dotType)).toString();
  }

  if (hero.barrier) {
    document.getElementById(`barrier-block`).style.display = 'inline-block';
    document.getElementById(`barrier`).innerText = Math.round(hero.getBarrierStrength()).toString();
  }

  const artiDmg = hero.getAfterMathArtifactDamage();
  if (artiDmg != null) {
    document.getElementById(`artifact-dmg-block`).style.display = 'inline-block';
    document.getElementById(`artifact-dmg`).innerText = Math.round(artiDmg).toString();
  }

  const table = document.getElementById('damage');
  table.innerHTML = '';
  for (const skillId of Object.keys(hero.skills)) {
    const skill = hero.skills[skillId];

    if (skill.rate !== undefined) {
      const damage = hero.getDamage(skillId);
      $(table).append(`<tr>
            <td>
              ${skill.name ? skill.name : skillLabel(skillId)}
              <a tabindex="0" class="btn btn-xs btn-light p-1 float-right" data-toggle="popover" title="${skillLabel('mods')}" data-content='${getModTooltip(hero, skillId)}' data-html="true" data-placement="top">
                <p>倍率</p>
              </a>
            </td>
            <td>${displayDmg(damage, 'crit')}</td>
            <td>${displayDmg(damage, 'crush')}</td>
            <td>${displayDmg(damage, 'normal')}</td>
            <td>${displayDmg(damage, 'miss')}</td>
      </tr>`);

      if (skill.soulburn) {
        const damage = hero.getDamage(skillId, true);
        $(table).append(`<tr>
            <td>
              ${skill.name ? skill.name : skillLabel(skillId, true)}
              <a tabindex="0" class="btn btn-xs btn-light p-1 float-right" data-toggle="popover" title="${skillLabel('mods')}" data-content='${getModTooltip(hero, skillId, true)}' data-html="true" data-placement="top">
                <p>倍率</p>
              </a>
            </td>
            <td>${displayDmg(damage, 'crit')}</td>
            <td>${displayDmg(damage, 'crush')}</td>
            <td>${displayDmg(damage, 'normal')}</td>
            <td>${displayDmg(damage, 'miss')}</td>
        </tr>`);
      }
    }
  }
};

const displayDmg = (damage, type) => {
  return damage[type] !== null ? damage[type] : `<i>${skillLabel('non_applicable')}</i>`
};

const getModTooltip = (hero, skillId, soulburn = false) => {
  const values = hero.getModifiers(skillId, soulburn);
  let content = `${skillLabel('att_rate')}: <b class="float-right">${values.rate}</b><br/>
                 ${skillLabel('power')}: <b class="float-right">${values.pow}</b><br/>`;

  if (values.mult !== null) {
    content += `${skillLabel('mult')}: <span class="float-right">${values.multTip} <b>${Math.round(values.mult*100)}%</b></span><br/>`;
  }
  if (values.flat !== null) {
    content += `${skillLabel('flat')}: <span class="float-right">${values.flatTip} <b>${Math.round(values.flat)}</b></span><br/>`;
  }
  if (values.critBoost !== null) {
    content += `${skillLabel('critBoost')}: <span class="float-right">${values.critBoostTip} <b>+${Math.round(values.critBoost*100)}%</b></span><br/>`;
  }
  if (values.pen != null) content += `${skillLabel('pen')}: <span class="float-right">${values.penTip} <b>${Math.round(values.pen*100)}%</b></span><br/>`;
  if (values.detonation != null) content += `${skillLabel('detonation')}: <b class="float-right">+${Math.round(values.detonation*100)}%</b><br/>`;
  if (values.exEq != null) content += `${skillLabel('exEq')}: <b class="float-right">+${Math.round(values.exEq*100)}%</b><br/>`;
  if (values.elemAdv !== null) content += `${skillLabel('elemAdv')}: <i class="fas ${values.elemAdv ? 'fa-check-square' : 'fa-times-circle'} float-right"></i><br/>`;
  if (values.afterMathFormula !== null && values.afterMathFormula.atkPercent!== undefined) {content += `${skillLabel('afterMathFormula')}/${skillLabel('att_rate')}: <b class="float-right">${Math.round(values.afterMathFormula.atkPercent*100)}%</b><br/>`;}
  if (values.afterMathFormula !== null && values.afterMathFormula.defPercent!== undefined) {content += `${skillLabel('afterMathFormula')}/${skillLabel('def_rate')}: <b class="float-right">${Math.round(values.afterMathFormula.defPercent*100)}%</b><br/>`;}
  if (values.afterMathFormula !== null && values.afterMathFormula.hpPercent!== undefined) {content += `${skillLabel('afterMathFormula')}/${skillLabel('hp_rate')}: <b class="float-right">${Math.round(values.afterMathFormula.hpPercent*100)}%</b><br/>`;}
  if (values.afterMathFormula !== null) content += `${skillLabel('afterMathFormula')}/${skillLabel('pen')}: <b class="float-right">${Math.round(values.afterMathFormula.penetrate*100)}%</b><br/>`;
  if (values.afterMathFormulaNoAdd !== null && values.afterMathFormulaNoAdd.atkPercent!== undefined) {content += `${skillLabel('afterMathFormulaNoAdd')}/${skillLabel('att_rate')}: <b class="float-right">${Math.round(values.afterMathFormulaNoAdd.atkPercent*100)}%</b><br/>`;}
  if (values.afterMathFormulaNoAdd !== null && values.afterMathFormulaNoAdd.defPercent!== undefined) {content += `${skillLabel('afterMathFormulaNoAdd')}/${skillLabel('def_rate')}: <b class="float-right">${Math.round(values.afterMathFormulaNoAdd.defPercent*100)}%</b><br/>`;}
  if (values.afterMathFormulaNoAdd !== null && values.afterMathFormulaNoAdd.hpPercent!== undefined) {content += `${skillLabel('afterMathFormulaNoAdd')}/${skillLabel('hp_rate')}: <b class="float-right">${Math.round(values.afterMathFormulaNoAdd.hpPercent*100)}%</b><br/>`;}
  if (values.afterMathFormulaNoAdd !== null) content += `${skillLabel('afterMathFormulaNoAdd')}/${skillLabel('pen')}: <b class="float-right">${Math.round(values.afterMathFormulaNoAdd.penetrate*100)}%</b><br/>`;
  if (values.afterMathDmg !== null) content += `${skillLabel('afterMathDmg')}: <b class="float-right">${Math.round(values.afterMathDmg)}</b><br/>`;
  if (values.afterMathDmgNoAdd !== null) content += `${skillLabel('afterMathDmgNoAdd')}: <b class="float-right">${Math.round(values.afterMathDmgNoAdd)}</b><br/>`;
  if (values.extraDmg != null) content += `${skillLabel('extraDmg')}: <span class="float-right">${values.extraDmgTip} <b>${Math.round(values.extraDmg)}</b><br/>`;
  if (values.fixed != null) content += `${skillLabel('fixed')}: <span class="float-right">${values.fixedTip ?? ''} <b>${Math.round(values.fixed)}</b><br/>`;
  return content;
}

const getGlobalAtkMult = () => {
  let mult = 0.0;

  for (let checkboxId of ['atk-down', 'atk-up', 'atk-up-great', 'vigor','enrage']) {
    const elem = document.getElementById(checkboxId);
    mult += elem.checked ? Number(elem.value)-1 : 0.0;
  }
  return mult + (Number(document.getElementById('atk-pc-up').value)/100);
};

const getGlobalDamageMult = (hero, skill) => {
  let mult = 0.0;
  const dmgUpBox = document.getElementById('dmg').value;
  mult += Number(dmgUpBox) * 0.01;
  for (let checkboxId of ['rage-set']) {
    const elem = document.getElementById(checkboxId);
    mult += elem.checked ? Number(elem.value)-1 : 0.0;
  }

  for (let checkboxId of ['jiliu-set']) {
    const elem = document.getElementById(checkboxId);
    const num = document.getElementById("jiliu");
    const ans=  (Number(elem.value) - 1)* Number(num.value)
    mult += elem.checked ? ans : 0.0;
  }

    
  
  const defPresetSelector = document.getElementById('def-preset');
  const selected = defPresetSelector.options[defPresetSelector.selectedIndex];
  if (hero.element === selected.dataset.elemExtraDmg) {
      mult += parseFloat(selected.dataset.extraDmgPc)-1;
  }

  if (getSkillType(skill) === skillTypes.single && selected.dataset.singleAtkMult) {
    mult += parseFloat(selected.dataset.singleAtkMult)-1;
  }
  if (getSkillType(skill) !== skillTypes.single && selected.dataset.nonSingleAtkMult) {
    mult += parseFloat(selected.dataset.nonSingleAtkMult)-1;
  }

  return mult;
};

const getGlobalDefMult = () => {
  let mult = 1.0;

  for (let checkboxId of ['def-up', 'def-down', 'target-vigor', 'target-anger']){
    const elem = document.getElementById(checkboxId);
    mult += elem.checked ? Number(elem.value) : 0.0;
  }

  return mult;
};

let currentHero = null;

class Hero {
  constructor(id, artifact) {
    this.id = id;
    this.atk = Number(document.getElementById('atk').value);
    this.crit = Number(document.getElementById('crit').value);
    this.skills = heroes[id].skills;
    this.baseAtk = heroes[id].baseAtk || 0;
    this.dot = [...(heroes[id].dot || []), ...(artifact?.getDoT() || [])];
    this.atkUp = heroes[id].atkUp;
    this.innateAtkUp = heroes[id].innateAtkUp;
    this.hpTransAtk = heroes[id].hpTransAtk;
    this.element = heroes[id].element;
    this.barrier = heroes[id].barrier;
    this.barrierEnhance = heroes[id].barrierEnhance;
    this.artifact = artifact;
    this.target = new Target(artifact);
    this.dotDamageUp = heroes[id].dotDamageUp;

    currentHero = this;
  }

  getModifiers(skillId, soulburn = false) {
    const skill = this.skills[skillId];
    return {
      rate: (typeof skill.rate === 'function') ? skill.rate(soulburn) : skill.rate,
      pow: (typeof skill.pow === 'function') ? skill.pow(soulburn) : skill.pow,
      mult: skill.mult ? skill.mult(soulburn)-1 : null,
      multTip: skill.multTip !== undefined ? getSkillModTip(skill.multTip(soulburn)) : '',
      flat: skill.flat ? skill.flat(soulburn) : null,
      flatTip: skill.flatTip !== undefined ? getSkillModTip(skill.flatTip(soulburn)) : '',
      critBoost: skill.critDmgBoost ? skill.critDmgBoost(soulburn) : null,
      critBoostTip: skill.critDmgBoostTip ? getSkillModTip(skill.critDmgBoostTip(soulburn)) : '',
      pen: skill.penetrate ? skill.penetrate() : null,
      penTip: skill.penetrateTip !== undefined ? getSkillModTip(skill.penetrateTip(soulburn)) : '',
      detonation: skill.detonation !== undefined ? skill.detonation()-1 : null,
      exEq: skill.exEq !== undefined ? skill.exEq() : null,
      elemAdv: (typeof skill.elemAdv === 'function') ? skill.elemAdv() : null,
      afterMathFormula: skill.afterMath !== undefined ? skill.afterMath(soulburn) : null,
      afterMathFormulaNoAdd: skill.afterMathNoAdd !== undefined ? skill.afterMathNoAdd(soulburn) : null,
      afterMathDmg: skill.afterMath !== undefined ? this.getAfterMathSkillDamage(skillId, hitTypes.crit,soulburn) : null,
      afterMathDmgNoAdd: skill.afterMathNoAdd !== undefined ? this.getAfterMathSkillDamageNoAdd(skillId, hitTypes.crit,soulburn) : null,
      extraDmg: skill.extraDmg !== undefined ? skill.extraDmg() : null,
      extraDmgTip: skill.extraDmgTip !== undefined ? getSkillModTip(skill.extraDmgTip(soulburn)) : '',
      fixed: skill.fixed !== undefined ? skill.fixed(hitTypes.crit) : null,
      fixedTip: skill.fixedTip !== undefined ? getSkillModTip(skill.fixedTip()) : null,
    }
  }

  getDamage(skillId, soulburn = false) {
    const critDmgUpBox = document.getElementById('crit-dmg-up');
    const critDmgBuff = critDmgUpBox && critDmgUpBox.checked ? Number(critDmgUpBox.value) : 0.0;

    const skill = this.skills[skillId];
    const hit = this.offensivePower(skillId, soulburn) * this.target.defensivePower(skill);
    const critDmg = Math.min((this.crit / 100)+critDmgBuff
        +(elements.caster_perception.value() ? 0.15 : 0)
        +(elements.caster_starshelter.value() ? 0.15 : 0), 3.5)
        +(this.artifact.getCritDmgBoost()||0)
        +(skill.critDmgBoost ? skill.critDmgBoost(soulburn) : 0);
    return {
      crit: skill.noCrit ? null : Math.round(hit*critDmg + (skill.fixed !== undefined ? skill.fixed(hitTypes.crit) : 0) + this.getAfterMathDamage(skillId, hitTypes.crit,soulburn)),
      crush: skill.noCrit || skill.onlyCrit ? null : Math.round(hit*1.3 + (skill.fixed !== undefined ? skill.fixed(hitTypes.crush) : 0) + this.getAfterMathDamage(skillId, hitTypes.crush,soulburn)),
      normal: skill.onlyCrit ? null : Math.round(hit + (skill.fixed !== undefined ? skill.fixed(hitTypes.normal) : 0) + this.getAfterMathDamage(skillId, hitTypes.normal,soulburn)),
      miss: skill.noMiss ? null : Math.round(hit*0.75 + (skill.fixed !== undefined ? skill.fixed(hitTypes.miss) : 0) + this.getAfterMathDamage(skillId, hitTypes.miss,soulburn))
    };
  }

  getAtk(skillId) {
    const skill = skillId !== undefined ? this.skills[skillId] : undefined;

    let atk = (skill !== undefined && skill.atk !== undefined) ? skill.atk() : this.atk;

    if (this.innateAtkUp !== undefined) {
      atk = atk / (1+this.innateAtkUp());
    }

    let atkImprint = 0;
    let atkMod = 1;
    if (skill === undefined || skill.noBuff !== true) {
      atkImprint = this.baseAtk * (Number(document.getElementById('atk-pc-imprint').value) / 100);
      atkMod = 1
          + getGlobalAtkMult()
          + (this.atkUp !== undefined ? this.atkUp() - 1 : 0)
          + (this.innateAtkUp !== undefined ? this.innateAtkUp() : 0)
          + this.artifact.getAttackBoost();
    }

    return (atk+atkImprint)*atkMod+ (this.hpTransAtk !== undefined ? this.hpTransAtk() : 0);
  }

  offensivePower(skillId, soulburn) {
    const skill = this.skills[skillId];

    const rate = (typeof skill.rate === 'function') ? skill.rate(soulburn) : skill.rate;

    const flatMod = skill.flat ? skill.flat(soulburn) : 0;
    const flatMod2 = (this.artifact.getFlatMult() + (skill.flat2 !== undefined ? skill.flat2() : 0));
   
    const pow = (typeof skill.pow === 'function') ? skill.pow(soulburn) : skill.pow;
    const skillEnhance = this.getSkillEnhanceMult(skillId);
    let elemAdv = 1.0;
    if (document.getElementById('elem-adv').checked || (typeof skill.elemAdv === 'function') && skill.elemAdv() === true) {
      elemAdv = Number(document.getElementById('elem-adv').value);
    }
    const target = document.getElementById('target').checked ? Number(document.getElementById('target').value) : 1.0;

    let dmgMod = 1.0
        + getGlobalDamageMult(this, skill)
        + this.artifact.getDamageMultiplier(skill, skillId)
        + (skill.mult ? skill.mult(soulburn)-1 : 0);

    return ((this.getAtk(skillId)*rate + flatMod)*dmgConst + flatMod2) * pow * skillEnhance * elemAdv * target * dmgMod;
  }

  getSkillEnhanceMult(skillId) {
    const skill = this.skills[skillId];
    let mult = 1.0;

    let enhancementSkillId = skillId;
    let enhancement = skill.enhance;

    if (!enhancement && skill.enhance_from) {
      enhancementSkillId = skill.enhance_from;
      enhancement = this.skills[skill.enhance_from].enhance;
    }

    if (enhancement) {
      const enhanceLevel = Number(document.getElementById(`molagora-${enhancementSkillId}`).value);
      for (let i = 0; i < enhanceLevel; i++) {
        mult += enhancement[i];
      }
    }

    if (skill.exEq !== undefined) {
      mult += skill.exEq();
    }

    return mult;
  }

  getAfterMathDamage(skillId, hitType,soulburn) {
    const skill = this.skills[skillId];
    const detonation = this.getDetonateDamage(skillId);

    let artiDamage = this.getAfterMathArtifactDamage(skillId);
    if (artiDamage === null) artiDamage = 0;

    const skillDamage = this.getAfterMathSkillDamage(skillId, hitType,soulburn);
    const skillExtraDmg = skill.extraDmg !== undefined ? Math.round(skill.extraDmg(hitType)) : 0;

    return detonation + artiDamage + skillDamage + skillExtraDmg;
  }

  getAfterMathSkillDamage(skillId, hitType,soulburn) {
    const skill = this.skills[skillId];

    let skillDamage = 0;
    const skillMultipliers = skill.afterMath ? skill.afterMath(hitType,soulburn) : null;
    if (skillMultipliers !== null) {
        console.log("atkPercent is ", skillMultipliers.atkPercent);
        if(skillMultipliers.atkPercent!== undefined){
        skillDamage = this.getAtk(skillId)*skillMultipliers.atkPercent*dmgConst*this.target.defensivePowerNoDef({ penetrate: () => skillMultipliers.penetrate }, true);
         }
        else if(skillMultipliers.defPercent!== undefined) {
        skillDamage = elements.caster_defense.value()*skillMultipliers.defPercent*dmgConst*this.target.defensivePowerNoDef({ penetrate: () => skillMultipliers.penetrate }, true); 
         }else{
        skillDamage = elements.caster_max_hp.value()*skillMultipliers.hpPercent*dmgConst*this.target.defensivePowerNoDef({ penetrate: () => skillMultipliers.penetrate }, true); 
         }
    }

    return skillDamage;
  }
  getAfterMathSkillDamageNoAdd(skillId, hitType,soulburn) {
    const skill = this.skills[skillId];

    let skillDamage = 0;
    const skillMultipliers = skill.afterMathNoAdd ? skill.afterMathNoAdd(hitType,soulburn) : null;
    if (skillMultipliers !== null) {
        console.log("atkPercent is ", skillMultipliers.atkPercent);
        if(skillMultipliers.atkPercent!== undefined){
        skillDamage = this.getAtk(skillId)*skillMultipliers.atkPercent*dmgConst*this.target.defensivePowerNoDef({ penetrate: () => skillMultipliers.penetrate }, true);
         }
        else if(skillMultipliers.defPercent!== undefined){
        skillDamage = elements.caster_defense.value()*skillMultipliers.defPercent*dmgConst*this.target.defensivePowerNoDef({ penetrate: () => skillMultipliers.penetrate }, true); 
         }else{
       skillDamage = elements.caster_max_hp.value()*skillMultipliers.hpPercent*dmgConst*this.target.defensivePowerNoDef({ penetrate: () => skillMultipliers.penetrate }, true); 
         }
    }

    return skillDamage;
  }

  getAfterMathArtifactDamage(skillId) {
    const skill = this.skills[skillId];

    const artiMultipliers = this.artifact.getAfterMathMultipliers(skill, skillId);
    if (artiMultipliers !== null) {
      if(artiMultipliers.atkPercent!== undefined){
      return this.getAtk()*artiMultipliers.atkPercent*dmgConst*this.target.defensivePowerNoDef({ penetrate: () => artiMultipliers.penetrate }, true);
      }
      else if(artiMultipliers.defPercent!== undefined){
      return elements.caster_defense.value()*artiMultipliers.defPercent*dmgConst*this.target.defensivePowerNoDef({ penetrate: () => artiMultipliers.penetrate }, true);
      }else{
      return elements.caster_max_hp.value()*artiMultipliers.hpPercent*dmgConst*this.target.defensivePowerNoDef({ penetrate: () => artiMultipliers.penetrate }, true);
        
      }
    }

    return null;
  }

  getDetonateDamage(skillId) {
    const skill = this.skills[skillId];

    const dotTypes = Array.isArray(skill.detonate) ? skill.detonate : [skill.detonate];
    let damage = 0;

    if (dotTypes.includes(dot.bleed)) damage += elements.target_bleed_detonate.value()*skill.detonation()*this.getDotDamage(dot.bleed);
    if (dotTypes.includes(dot.burn)) damage += elements.target_burn_detonate.value()*skill.detonation()*this.getDotDamage(dot.burn);
    if (dotTypes.includes(dot.bomb)) damage += elements.target_bomb_detonate.value()*skill.detonation()*this.getDotDamage(dot.bomb);

    return damage;
  }

  getDotDamage(type) {
    const dotDamageRate = this.dotDamageUp? Number(this.dotDamageUp)  : 1 ;
    switch (type) {
      case dot.bleed:
        return this.getAtk()*0.3*dmgConst*this.target.defensivePowerNoDef({ penetrate: () => 0.7 }, true)*dotDamageRate;
      case dot.burn:
        return this.getAtk()*0.6*dmgConst*this.target.defensivePowerNoDef({ penetrate: () => 0.7 }, true)*dotDamageRate;
      case dot.bomb:
        return this.getAtk()*1.5*dmgConst*this.target.defensivePowerNoDef({ penetrate: () => 0.7 }, true)*dotDamageRate;
      default: return 0;
    }
  }

  getBarrierStrength() {
    return this.barrier(this)*(this.barrierEnhance ? this.getSkillEnhanceMult(this.barrierEnhance) : 1);
  }
}

class Target {
  constructor(casterArtifact) {
    const defMult = getGlobalDefMult() + Number(document.getElementById('def-pc-up').value)/100;
    this.def = Number(document.getElementById('def').value)*defMult;
    this.casterArtifact = casterArtifact;
  }

  getPenetration(skill) {
    const base = skill && skill.penetrate ? skill.penetrate() : 0;
    const artifact = this.casterArtifact.getDefensePenetration(skill);
    const set = (getSkillType(skill) === skillTypes.single) && document.getElementById('pen-set') && document.getElementById('pen-set').checked
        ? Number(document.getElementById('pen-set').value)
        : 0;
    const pendef = (100-Number(document.getElementById('target-pendef').value))/100;
    return Math.min(1, (1-base*pendef) * (1-set*pendef) * (1-artifact*pendef));
  }

  getPenetrationNoDef(skill) {
    const base = skill && skill.penetrate ? skill.penetrate() : 0;
    const artifact = this.casterArtifact.getDefensePenetration(skill);
    const set = (getSkillType(skill) === skillTypes.single) && document.getElementById('pen-set') && document.getElementById('pen-set').checked
        ? Number(document.getElementById('pen-set').value)
        : 0;
    return Math.min(1, (1-base) * (1-set) * (1-artifact));
  }

  defensivePower(skill, noReduc = false) {
    const dmgReduc = noReduc ? 0 : Number(document.getElementById('dmg-reduc').value)/100;
    const dmgTrans = skill.noTrans === true ? 0 : Number(document.getElementById('dmg-trans').value)/100;
    return ((1-dmgReduc)*(1-dmgTrans))/(((this.def / 300)*this.getPenetration(skill)) + 1);
  }

  defensivePowerNoDef(skill, noReduc = false) {
    const dmgReduc = noReduc ? 0 : Number(document.getElementById('dmg-reduc').value)/100;
    const dmgTrans = skill.noTrans === true ? 0 : Number(document.getElementById('dmg-trans').value)/100;
    return ((1-dmgReduc)*(1-dmgTrans))/(((this.def / 300)*this.getPenetrationNoDef(skill)) + 1);
  }
}

class Artifact {
  constructor(id) {
    this.id = id ? id : undefined;
  }

  applies(skill, skillId = undefined) {
    if (this.id === undefined || skill === undefined) return true;
    return artifacts[this.id].applies !== undefined ? artifacts[this.id].applies(skill, skillId) : true;
  }

  getName() {
    return artifactName(this.id);
  }

  getValue() {
    return artifacts[this.id].scale
        ? artifacts[this.id].scale[Math.floor(document.getElementById('artifact-lvl').value/3)]
        : artifacts[this.id].value;
  }

  getDamageMultiplier(skill, skillId) {
    if(!this.applies(skill, skillId)) return 0;
    if (this.id === undefined || artifacts[this.id].type !== artifactDmgType.damage) {
      return 0;
    }
    return typeof artifacts[this.id].value === 'function' ? artifacts[this.id].value(this.getValue()) : this.getValue();
  }

  getDefensePenetration(skill) {
    if(!this.applies(skill)) return 0;
    if (this.id === undefined || artifacts[this.id].type !== artifactDmgType.penetrate) {
      return 0;
    }
    return this.getValue();
  }

  getAfterMathMultipliers(skill, skillId) {
    if(!this.applies(skill, skillId)) return null;
    if (this.id === undefined || artifacts[this.id].type !== artifactDmgType.aftermath || artifacts[this.id].penetrate === undefined) {
      return null;
    }
    return {
      atkPercent: artifacts[this.id].atkPercent,
      defPercent: artifacts[this.id].defPercent,
      hpPercent: artifacts[this.id].hpPercent,
      penetrate: artifacts[this.id].penetrate,
    }
  }

  getAttackBoost() {
    if (this.id === undefined || artifacts[this.id].type !== artifactDmgType.attack) {
      return 0;
    }
    return artifacts[this.id].value ? artifacts[this.id].value(this.getValue()) : this.getValue();
  }

  getCritDmgBoost() {
    if (this.id === undefined || artifacts[this.id].type !== artifactDmgType.critDmgBoost) {
      return 0;
    }
    return artifacts[this.id].value ? artifacts[this.id].value(this.getValue()) : this.getValue();
  }

  getFlatMult() {
    if (this.id === undefined || artifacts[this.id].type !== artifactDmgType.flat) {
      return 0;
    }
    return artifacts[this.id].flat(this.getValue());
  }

  getDoT() {
    if (this.id === undefined || artifacts[this.id].type !== artifactDmgType.dot) {
      return null;
    }
    
    return artifacts[this.id].dot;
  }
}
