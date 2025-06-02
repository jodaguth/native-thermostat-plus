// 2. custom-thermostat-card-editor.ts
import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant } from "custom-card-helpers";

@customElement("custom-thermostat-card-editor")
export class CustomThermostatCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config: any;

  setConfig(config) {
    this._config = config;
  }

  render() {
    if (!this.hass) return html``;
    return html`
      <ha-formfield label="Climate Entity">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config?.entity}
          .configValue=${"entity"}
          domain-filter="climate"
          @value-changed=${this._valueChanged}>
        </ha-entity-picker>
      </ha-formfield>
      <ha-formfield label="Temperature Sensor">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config?.current_temperature_entity}
          .configValue=${"current_temperature_entity"}
          domain-filter="sensor"
          @value-changed=${this._valueChanged}>
        </ha-entity-picker>
      </ha-formfield>
    `;
  }

  private _valueChanged(ev: Event) {
    const target = ev.target as any;
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: {
        config: {
          ...this._config,
          [target.configValue]: target.value
        },
      },
    }));
  }
}
