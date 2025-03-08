import { useState } from "react";
import axios from "axios";
import { Card, Select, Input, Button, Tabs, Typography, Spin } from "antd";
import { SwapOutlined, ReloadOutlined, ArrowDownOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

function App() {
  const getOptionsByType = (type) => {
    const options = {
      length: ["millimeter", "centimeter", "meter", "kilometer", "inch", "foot", "yard", "mile"],
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
      const { data } = await axios.post("https://unity-converter-roadmap-backend.vercel.app/api/conversions", {
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

  return (
    <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, padding: 20 }}>
      <Card
        style={{
          width: 400,
          textAlign: "center",
          borderRadius: "10px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          background: "#f9f9f9",
        }}
      >
        <Title level={3} style={{ marginBottom: 10 }}>
          Unit Converter
        </Title>

        <Tabs activeKey={state.type} onChange={handleTypeChange} size="large">
          <TabPane tab="Length" key="length" />
          <TabPane tab="Weight" key="weight" />
          <TabPane tab="Temperature" key="temperature" />
        </Tabs>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Input
            size="large"
            placeholder="Enter value"
            value={state.value}
            onChange={(e) => handleChange("value", e.target.value)}
            style={{ borderRadius: "8px" }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Select
              size="large"
              value={state.from}
              onChange={(value) => handleChange("from", value)}
              style={{ flex: 1 }}
            >
              {getOptionsByType(state.type).map((unit) => (
                <Option key={unit} value={unit}>
                  {unit.charAt(0).toUpperCase() + unit.slice(1)}
                </Option>
              ))}
            </Select>
            
            <ArrowDownOutlined style={{ fontSize: "20px", color: "#1890ff" }} />

            <Select
              size="large"
              value={state.to}
              onChange={(value) => handleChange("to", value)}
              style={{ flex: 1 }}
            >
              {getOptionsByType(state.type).map((unit) => (
                <Option key={unit} value={unit}>
                  {unit.charAt(0).toUpperCase() + unit.slice(1)}
                </Option>
              ))}
            </Select>
          </div>

          <Button
            type="primary"
            size="large"
            onClick={handleConvert}
            disabled={!state.value}
            loading={state.isLoading}
            style={{
              transition: "all 0.2s ease-in-out",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <SwapOutlined />
            Convert
          </Button>
        </div>
      </Card>

      {state.result !== null && (
        <Card
          style={{
            width: 400,
            textAlign: "center",
            borderRadius: "10px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            background: "#f9f9f9",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Title level={4}>Result</Title>
          <p style={{ fontSize: "20px", margin: "0" }}>
            {`${state.value} ${state.from} = ${state.result} ${state.to}`}
          </p>
          <Button
            danger
            size="large"
            onClick={() => handleChange("result", null)}
            style={{
              marginTop: "15px",
              transition: "all 0.2s ease-in-out",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <ReloadOutlined />
            Reset
          </Button>
        </Card>
      )}
    </div>
  );
}

export default App;
