import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { HomeAssistant } from "custom-card-helpers";

@customElement("custom-thermostat-card")
export class CustomThermostatCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property() private config: any;

  setConfig(config: any): void {
    this.config = config;
    if (!config.entity) {
      throw new Error("Entity is required");
    }
  }

  createRenderRoot() {
    return this;
  }

  async firstUpdated() {
    await customElements.whenDefined("hui-thermostat-card");

    const card = document.createElement("hui-thermostat-card");
    (card as any).setConfig({ entity: this.config.entity });

    const customSensor = this.config.current_temperature_entity;
    const realClimate = this.hass.states[this.config.entity];

    const patchedClimate = {
      ...realClimate,
      attributes: {
        ...realClimate.attributes,
        current_temperature: customSensor
          ? Number(this.hass.states[customSensor]?.state)
          : realClimate.attributes.current_temperature,
      },
    };

    const fakeHass = {
      ...this.hass,
      states: {
        ...this.hass.states,
        [this.config.entity]: patchedClimate,
      },
    };

    const originalState = this.hass.states[this.config.entity];
    const patchedState = {
      ...originalState,
      attributes: {
        ...originalState.attributes,
        current_temperature: customSensor
          ? Number(this.hass.states[customSensor]?.state)
          : originalState.attributes.current_temperature,
      },
    };

    const realHass = { ...this.hass };
    realHass.states = {
      ...this.hass.states,
      [this.config.entity]: patchedState,
    };

    const castCard = card as any;
    castCard.setConfig({ entity: this.config.entity });
    castCard.hass = realHass;

    this.innerHTML = "";
    this.appendChild(card);
  }

  render() {
    return html``;
  }
}