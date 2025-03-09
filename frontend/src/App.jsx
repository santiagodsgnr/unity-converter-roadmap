import { useState } from "react";
import axios from "axios";
import { Card, Select, Input, Button, Tabs, Typography, Spin } from "antd";
import {
  SwapOutlined,
  ReloadOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const getOptionsByType = (type) => {
    const options = {
      length: [
        "millimeter",
        "centimeter",
        "meter",
        "kilometer",
        "inch",
        "foot",
        "yard",
        "mile",
      ],
      weight: ["milligram", "gram", "kilogram", "ounce", "pound"],
      temperature: ["celsius", "fahrenheit", "kelvin"],
    };
    return options[type] || [];
  };

  const [state, setState] = useState({
    value: "",
    type: "length",
    from: "meter",
    to: "kilometer",
    result: null,
    isLoading: false,
  });

  const handleChange = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const handleTypeChange = (newType) => {
    const options = getOptionsByType(newType);
    setState({
      value: "",
      type: newType,
      from: options[0],
      to: options[1] || options[0],
      result: null,
      isLoading: false,
    });
  };

  const handleConvert = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/conversions`, {
        value: Number(state.value),
        from: state.from,
        to: state.to,
        type: state.type,
      });
      setState((prev) => ({ ...prev, result: data.result, isLoading: false }));
    } catch (error) {
      console.log(error);
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleSwapUnits = () => {
    setState((prev) => ({ ...prev, from: prev.to, to: prev.from }));
  };

  // Función para obtener la primera letra de la unidad (para el círculo)
  const getUnitInitial = (unit) => {
    return unit.charAt(0).toUpperCase();
  };

  return (
    <div className="app-container">
      <div class="container">
        <div class="gradient-circle left"></div>
        <div class="gradient-circle right"></div>
      </div>

      <div className="header">
        <div className="logo">UnitConvert</div>
        <div className="account-info">
          <Button type="primary" className="connect-button">
            View Github
          </Button>
        </div>
      </div>

      <div className="content-container">
        <div className="converter-card">
          <div className="card-header">
            <h2>Convert</h2>
            <Button
              onClick={() =>
                setState({
                  value: "",
                  type: "length",
                  from: "meter",
                  to: "kilometer",
                  result: null,
                  isLoading: false,
                })
              }
              icon={<ReloadOutlined />}
              type="text"
              className="settings-button"
            />
          </div>

          <Tabs
            activeKey={state.type}
            onChange={handleTypeChange}
            className="custom-tabs"
          >
            <TabPane tab="Length" key="length" />
            <TabPane tab="Weight" key="weight" />
            <TabPane tab="Temperature" key="temperature" />
          </Tabs>

          <div className="conversion-section">
            <div className="input-with-select">
              <div className="unit-select">
                <Select
                  value={state.from}
                  onChange={(value) => handleChange("from", value)}
                  className="unit-dropdown"
                  dropdownClassName="dark-dropdown"
                  suffixIcon={<ArrowDownOutlined />}
                  dropdownMatchSelectWidth={false}
                >
                  {getOptionsByType(state.type).map((unit) => (
                    <Option key={unit} value={unit}>
                      <div className="unit-option">
                        <div className="unit-icon">{getUnitInitial(unit)}</div>
                        <span className="unit-name">
                          {unit.charAt(0).toUpperCase() + unit.slice(1)}
                        </span>
                      </div>
                    </Option>
                  ))}
                </Select>
              </div>
              <Input
                className="value-input"
                placeholder="0"
                value={state.value}
                onChange={(e) => handleChange("value", e.target.value)}
                bordered={false}
              />
            </div>

            <div className="swap-icon-container">
              <Button
                className="swap-direction-button"
                icon={<SwapOutlined />}
                onClick={handleSwapUnits}
              />
            </div>

            <div className="input-with-select">
              <div className="unit-select">
                <Select
                  value={state.to}
                  onChange={(value) => handleChange("to", value)}
                  className="unit-dropdown"
                  dropdownClassName="dark-dropdown"
                  suffixIcon={<ArrowDownOutlined />}
                  dropdownMatchSelectWidth={false}
                >
                  {getOptionsByType(state.type).map((unit) => (
                    <Option key={unit} value={unit}>
                      <div className="unit-option">
                        <div className="unit-icon">{getUnitInitial(unit)}</div>
                        <span className="unit-name">
                          {unit.charAt(0).toUpperCase() + unit.slice(1)}
                        </span>
                      </div>
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="result-container">
                {state.isLoading ? (
                  <Spin className="result-spinner" />
                ) : (
                  <div
                    className={`result-value ${
                      state.result !== null ? "has-result" : ""
                    }`}
                  >
                    {state.result !== null ? state.result : "0"}
                  </div>
                )}
              </div>
            </div>
          </div>
          {state.result !== null && (
            <div className="result-summary">
              <div className="result-card">
                <div className="result-title">Conversion Result</div>
                <div className="result-equation">
                  <span className="source-value">{state.value}</span>
                  <span className="source-unit">{state.from}</span>
                  <span className="equals-sign">=</span>
                  <span className="target-value">{state.result}</span>
                  <span className="target-unit">{state.to}</span>
                </div>
              </div>
            </div>
          )}

          <Button
            className="convert-button"
            size="large"
            onClick={handleConvert}
            disabled={!state.value}
            loading={state.isLoading}
          >
            Convert
          </Button>
        </div>
      </div>
      <div className="footer">
        <p className="footer-text">Unit Converter by Santiago Ardila</p>
      </div>
    </div>
  );
}

export default App;
