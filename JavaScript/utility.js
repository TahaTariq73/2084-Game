export default class Utility{
    static getCustomProperty(element, property) {
        return parseFloat(getComputedStyle(element).getPropertyValue(property));
    }

    static setCustomProperty(element, property, value) {
        element.style.setProperty(property, value);
    }
}