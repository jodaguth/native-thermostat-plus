// Repo: native-thermostat-plus
// Purpose: Native thermostat clone that allows custom current temperature sensor

// Files:
// - custom-thermostat-card.ts
// - custom-thermostat-card-editor.ts
// - rollup.config.js
// - package.json
// - README.md


import { html, LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardEditor } from "custom-card-helpers";

@customElement("custom-thermostat-card")
export class CustomThermostatCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property() private config: any;

  setConfig(config: any): void {
    this.config = config;
  }

  static getStubConfig(hass: HomeAssistant) {
    const entity = Object.keys(hass.states).find(e => e.startsWith("climate.")) || "";
    return { entity };
  }

  static async getConfigElement() {
    await import("./custom-thermostat-card-editor");
    return document.createElement("custom-thermostat-card-editor");
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const climate = this.hass.states[this.config.entity];
    const sensor = this.config.current_temperature_entity
      ? this.hass.states[this.config.current_temperature_entity]?.state
      : climate.attributes.current_temperature;

    return html`
      <ha-card header="${climate.attributes.friendly_name || this.config.name}">
        <div class="thermostat-card">
          <div class="temp">Current: ${sensor}°C</div>
          <div class="target">Target: ${climate.attributes.temperature}°C</div>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    .thermostat-card {
      padding: 16px;
    }
    .temp, .target {
      font-size: 18px;
      margin: 4px 0;
    }
  `;
}