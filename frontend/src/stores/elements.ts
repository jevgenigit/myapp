import { defineStore } from "pinia";
import { ref, computed } from 'vue';
import windImage from "@/assets/images/windpark.png";
import solarImage from "@/assets/images/solarpark.png";
import householdImage from "@/assets/images/households.png";
import factoryImage from "@/assets/images/factory.png";
import fossilImage from "@/assets/images/fossil.png";
 
export const useElementStore = defineStore('element', () => {
 
  const elements = ref([
    {
      "id": 1,
      "isProducer": true,
      "type": "windpark",
      "name": "Wind park",
      "maxOutput": 200,
      "minOutput": 0,
      "currentOutput": 30,
      "currentMaxOutput": 150,
      "stepIncrement": 5,
      "image": windImage,
    },
    {
      "id": 2,
      "isProducer": true,
      "type": "solarpark",
      "name": "Solar park",
      "maxOutput": 150,
      "minOutput": 0,
      "currentOutput": 30,
      "currentMaxOutput": 150,
      "stepIncrement": 5,
      "image": solarImage
    },
    {
      "id": 3,
      "isProducer": false,
      "type": "households",
      "name": "Households",
      "maxConsumption": 130,
      "minConsumption": 0,
      "currentConsumption": 100,
      "stepIncrement": 2,
      "image": householdImage
    },
    {
      "id": 4,
      "isProducer": true,
      "type": "fossil",
      "name": "Fossil fuel power station",
      "maxOutput": 200,
      "currentMaxOutput": null,
      "minOutput": 0,
      "currentOutput": 150,
      "stepIncrement": 10,
      "image": fossilImage
    },
    {
      "id": 5,
      "isProducer": false,
      "type": "factory",
      "name": "Industrial factory",
      "maxConsumption": 200,
      "minConsumption": 0,
      "currentConsumption": 100,
      "stepIncrement": 2,
      "image": factoryImage
    },
  ]);
 
  function getMaxOutput(elementId: number) {
    const element = elements.value.find((el) => el.id === elementId);
    return element ? element.maxOutput : null;
  }
 
  function getMinOutput(elementId: number) {
    const element = elements.value.find((el) => el.id === elementId);
    return element ? element.minOutput : null;
  }
 
  const updateElementValue = (elementName: string, newValue: number, isProduction: boolean) => {
    const element = elements.value.find((el) => el.name === elementName);
    if (element) {
      const maxLimit =
        (element.type === "windpark" || element.type === "solarpark"
          ? element.currentMaxOutput
          : element.maxOutput) || element.maxOutput;
 
      if (isProduction) {
        element.currentOutput = Math.min(newValue , maxLimit ?? 0);
      }
    }
  };
 
  const updateElementMaxOutput = (elementName: string, newMaxOutput: number) => {
    const element = elements.value.find((el) => el.name === elementName);
    if (element && (element.type === "windpark" || element.type === "solarpark")) {
      element.currentMaxOutput = Math.min(newMaxOutput, element.maxOutput ?? 0);
    } else if (element) {
      element.currentMaxOutput = element.maxOutput;
    }
  };
 
    const updateElementMinValue = (elementName: string, newValue: number, isProduction: boolean) => {
      const element = elements.value.find((el) => el.name === elementName);
      if (element) {
        if (isProduction) {
          element.minOutput = newValue;
        } else {
          element.minConsumption = newValue;
        }
      }
    };
    const updateElementMaxValue = (elementName: string, newValue: number, isProduction: boolean) => {
      const element = elements.value.find((el) => el.name === elementName);
      if (element) {
        if (isProduction) {
          element.maxOutput = newValue;
        } else {
          element.maxConsumption = newValue;
        }
      }
    };
   const updateElementStepIncrement = (elementName: string, newValue: number, isProduction: boolean) => {
      const element = elements.value.find((el) => el.name === elementName);
      if (element) {
            element.stepIncrement = newValue;
      }       
    };

    const ensureNumber = (value: unknown): number => isNaN(Number(value)) ? 0 : Number(value);
  
    const calculateCurrentTotalOutput = computed(() =>
        elements.value
          .filter((el) => el.isProducer)
          .reduce((total, el) => total + ensureNumber(el.currentOutput), 0)
    );
    
    const calculateTotalCurrentConsumption = computed(() =>
        elements.value
          .filter((el) => !el.isProducer)
          .reduce((total, el) => total + ensureNumber(el.currentConsumption), 0)
    );

  
    const calculateEnergyDifference = computed(() =>
      calculateCurrentTotalOutput.value - calculateTotalCurrentConsumption.value
    );

    const calculateCurrentFrequency = computed(() => {
        const energyDifference = calculateEnergyDifference.value;
        const totalOutput = calculateCurrentTotalOutput.value;
        const systemGain = 20 

        if (totalOutput === 0) {
          return 0; 
        }
          
        let frequency = energyDifference / systemGain + 50; 
      
        if (frequency >= 51) {
          frequency = 51; 
        } else if (frequency <= 49)
        {
          frequency = 49
        }  
        
        return parseFloat(frequency.toFixed(2));
    });

    return {
      elements,
      getMaxOutput,
      getMinOutput,
      calculateCurrentTotalOutput,
      calculateTotalCurrentConsumption,
      calculateEnergyDifference,
      calculateCurrentFrequency,
      updateElementValue,
      updateElementMaxValue,
      updateElementMinValue,
      updateElementStepIncrement,
      updateElementMaxOutput
    };
});
 
 