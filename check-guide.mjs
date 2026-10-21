import assert from 'node:assert/strict';
import {assessGuide} from './dist/guide.mjs';
assert.equal(assessGuide({sign:'5',goal:'1',age:'2',water:'2'}).stress,true);
assert.equal(assessGuide({sign:'2',goal:'1',age:'1',water:'3'}).young,true);
assert.equal(assessGuide({sign:'4',goal:'2',age:'2',water:'1'}).waterCheck,'dry');
assert.equal(assessGuide({sign:'6',goal:'0',age:'0',water:'0'}).stage,6);
assert.equal(assessGuide({sign:'0',goal:'0',age:'0',water:'0'}).stage,0);
console.log('Passed: stress, young flowering crop, water context and unknown-stage cases.');
