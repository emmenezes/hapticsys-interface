// import { useState } from 'react';

const RST_INPUT = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
const MAX_MODULES = 12;

export function useInputGenerator() {
  // const [maxValue, setMaxValue] = useState(7);
  // const [minValue, setMinValue] = useState(1);

  /**
   * Set all modules to the same magnitude
   *
   * @param magnitude
   */
  function setAllModules(magnitude) {
    let input = [];
    for (let i = 0; i < 12; i++) {
      input.push(magnitude);
    }
    return [input.join('')];
  }

  /**
   * Set one module to specific magnitudde
   * 
   * @param module selected actuator
   * @param magnitude intesity
  */
  function setOneModule(module, magnitude) {
    let input = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
    input[module] = magnitude;
    return [input.join('')];
  }

  /**
   * Create wave sequence
   *
   * @param mode reverse or direct
   * @param magnitude value per module
   */
  function generateWaveInput(mode, magnitude) {
    let input = [];
    if (mode === 'reverse') {
      for (let i = MAX_MODULES - 1; i >= 0; i--) {
        let sequence = [...RST_INPUT];
        sequence[i] = magnitude;
        input.push(sequence.join(''));
      }
      return input;
    }
    for (let i = 0; i < MAX_MODULES; i++) {
      let sequence = [...RST_INPUT];
      sequence[i] = magnitude;
      input.push(sequence.join(''));
    }
    return input;
  }

  return { setAllModules, generateWaveInput, setOneModule };
}
