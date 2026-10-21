import assert from 'node:assert/strict';
import {decideDurian,durianCases,durianNext} from './dist/durian-guide.mjs';
const base={situation:'mature',soil:'moist',health:'ok',bearing:'yes',nitrogen:'no',flush:'no',neighbours:'no',dropStage:'fruit'};
for(const [change,key] of [ [{soil:'wet'},'wet'],[{soil:'dry'},'dry'],[{health:'poor'},'health'],[{soil:'unknown'},'soil'],[{situation:'buds'},'buds'],[{situation:'flowers'},'flowering'],[{situation:'flush',nitrogen:'yes'},'flushN'],[{situation:'flush'},'flush'],[{bearing:'no'},'young'],[{bearing:'unknown'},'bearing'],[{neighbours:'yes'},'compare'],[{},'season'],[{neighbours:'unknown'},'local'],[{situation:'drop',dropStage:'flowers'},'pollination'],[{situation:'drop',flush:'yes'},'competition'],[{situation:'drop'},'drop'],[{situation:'fruit'},'fruit'],[{situation:'recover'},'recover'] ])assert.equal(decideDurian({...base,...change}),key,JSON.stringify(change));
let count=0;const reached=new Set();
for(const situation of ['flush','mature','buds','flowers','drop','fruit','recover','young','unwell'])for(const soil of ['wet','dry','moist','unknown'])for(const health of ['ok','poor','unknown'])for(const bearing of ['yes','no','unknown'])for(const nitrogen of ['yes','no','unknown'])for(const flush of ['yes','no','unknown'])for(const neighbours of ['yes','no','unknown'])for(const dropStage of ['flowers','fruit']){
 const answers={situation,soil,health,bearing,nitrogen,flush,neighbours,dropStage};const key=decideDurian(answers);for(const next of durianNext(answers)){assert.notEqual(decideDurian({...answers,...next.patch}),key,'next-stage action must not return the same decision');}reached.add(key);assert.ok(durianCases[key]);for(const lang of ['zh','en','ms']){const c=durianCases[key][lang];assert.equal(c.length,4);assert.equal(c[1].split('|').length,3);assert.ok(c.every(s=>s.trim().length>0));}count++;
}
assert.equal(reached.size,Object.keys(durianCases).length,'every decision path exercised');
console.log(`Passed ${count} combinations; ${reached.size} distinct decisions; three languages; exactly three actions per result.`);


const buds={...base,situation:'buds'};const opened=durianNext(buds).find(n=>n.id==='flowers');assert.equal(decideDurian({...buds,...opened.patch}),'flowering');assert.equal({...buds,...opened.patch}.soil,'moist');assert.equal({...buds,...opened.patch}.bearing,'yes');
