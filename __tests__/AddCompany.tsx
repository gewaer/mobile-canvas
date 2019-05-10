import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import AddCompany from "../src/screens/add-company";

test("funtion are renderes", () => {
  const company = renderer.create(<AddCompany />).toJSON();
  expect(company).toMatchSnapshot();
});
