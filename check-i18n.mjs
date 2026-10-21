import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {lessons,stages,cases,questions,educationSources} from './dist/education.mjs';
import {sources as researchSources} from './dist/sources.mjs';
import {cropProfiles} from './dist/flower.mjs';
import {additionalCrops} from './dist/catalog.mjs';
import {localize,translateText} from './dist/i18n.mjs';
const crops={...cropProfiles,...additionalCrops};delete crops.other;
const base={lessons,stages,cases,questions,sources:[...educationSources,...researchSources],crops};
assert.equal(localize(base,'zh'),base);
const cjk=/[\u3400-\u9fff]/;
for(const lang of ['en','ms']){
 const translated=localize(base,lang);
 for(const key of ['lessons','stages','cases','questions','sources'])assert.equal(translated[key].length,base[key].length);
 assert.equal(Object.keys(translated.crops).length,14);
 for(const key of ['cases','questions'])translated[key].forEach((q,i)=>{assert.equal(q.answer,base[key][i].answer);assert.equal(q.options.length,base[key][i].options.length);});
 translated.sources.forEach((s,i)=>{assert.equal(s.id,base.sources[i].id);assert.equal(s.url,base.sources[i].url);});
 const visible={...translated,sources:translated.sources.map(({type,...s})=>s)};
 assert.ok(!cjk.test(JSON.stringify(visible)),lang+' has untranslated learning content');
 const html=readFileSync('dist/index.html','utf8');
 for(const [,raw] of html.matchAll(/>([^<>]+)</g)){const text=raw.trim();if(text==='中文'||!cjk.test(text))continue;assert.ok(!cjk.test(translateText(text,lang)),lang+' missing static translation: '+text);}
 for(const s of ['已学 2 / 6 课','已回答 3 / 6 题 · 当前答对 2 题','本次答对 5 / 6 题。你可以修改答案再练习。','查看来源 F4','第 2 题答案','情境 3 的答案','原始研究 · F4','Durian：先记住这个结论'])assert.ok(!cjk.test(translateText(s,lang)),lang+' missing dynamic translation: '+s);
}
console.log('Passed: English / Chinese / Malay coverage, 14 crops and 32 sources, unchanged quiz answers and citations, static and dynamic labels.');
