function temperatureView() {
  temperatureViewBool = true;
  salinityViewBool = false;
  pressureViewBool = false;
  SSPViewBool = false;
}

function salinityView() {
  temperatureViewBool = false;
  salinityViewBool = true;
  pressureViewBool = false;
  SSPViewBool = false;
}

function pressureView() {
  temperatureViewBool = false;
  salinityViewBool = false;
  pressureViewBool = true;
  SSPViewBool = false;
}

function SSPView() {
  temperatureViewBool = false;
  salinityViewBool = false;
  pressureViewBool = false;
  SSPViewBool = true;
}
