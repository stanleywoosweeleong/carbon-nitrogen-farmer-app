import assert from 'node:assert/strict';
import {nitrogenApplied} from './dist/durian-guide.mjs';
assert.equal(nitrogenApplied(2,15),.3);
assert.equal(nitrogenApplied(5,12),.6);
assert.equal(nitrogenApplied(0,15),0);
assert.throws(()=>nitrogenApplied(2,150));
assert.throws(()=>nitrogenApplied(-1,15));
assert.throws(()=>nitrogenApplied(NaN,15));
console.log('Passed: product mass and label N arithmetic, units and invalid inputs.');
