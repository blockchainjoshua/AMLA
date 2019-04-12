import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { Graph } from "react-d3-graph";
import { Alert } from 'reactstrap';
import { ForceGraph2D, ForceGraph3D, ForceGraphVR, SpriteText } from 'react-force-graph';

import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Progress,
  Row
} from "reactstrap";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";

import nodes from "./nodes.json";

console.log(nodes);

// graph payload (with minimalist structure)
const data = {
  nodes: nodes.nodes,
  links: nodes.links
};

const myConfig = {
  width: 1590,
  height: 775,
  nodeHighlightBehavior: true,

  node: {
    size: 50,
    highlightStrokeColor: "black",
    fontSize: 10
  },
  link: {
    highlightColor: "black"
  }
};

// graph event callbacks
const onClickGraph = function () {
  // window.alert(`Clicked the graph background`);
};

const onClickNode = function (nodeId, target) {
  window.alert(`Name :  ${nodeId} ${target}`);
};

const onRightClickNode = function (event, nodeId) {
  window.alert(`Right clicked node ${nodeId}`);

};

const onMouseOverNode = function (nodeId) {
  // window.alert(`Mouse over node ${nodeId}`);
};

const onMouseOutNode = function (nodeId) {
  // window.alert(`Mouse out node ${nodeId}`);
};

const onClickLink = function (source, target) {
  window.alert(`Sender : ${source} \nReciever:  ${target}`);
};

const onRightClickLink = function (event, source, target) {
  // window.alert(`Right clicked link between ${source} and ${target}`);
};

const onMouseOverLink = function (source, target) {
  // window.alert(`Mouse over in link between ${source} and ${target}`);
};

const onMouseOutLink = function (source, target) {
  // window.alert(`Mouse out link between ${source} and ${target}`);
};

var cardStyle = {
  display: 'block',
  transitionDuration: '0.3s',
  height: '45vw'
}

const brandPrimary = getStyle("--primary");
const brandSuccess = getStyle("--success");
const brandInfo = getStyle("--info");
const brandWarning = getStyle("--warning");
const brandDanger = getStyle("--danger");
const styles = {
  link: {
    color: "Black"
  }
};

// Main Chart
//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];
var data4 = [];
var data5 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 210));
  data3.push(random(65, 240));
  data4.push(random(20, 150));
  data5.push(random(10, 190));
}

const mainChart = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ],
  datasets: [
    {
      label: "Security Bank",
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: "#fff",
      borderWidth: 2,
      lineTension: 0.1,
      borderJoinStyle: "miter",
      data: data1
    },
    {
      label: "UCPB",
      backgroundColor: "transparent",
      borderColor: brandSuccess,
      pointHoverBackgroundColor: "#fff",
      borderWidth: 2,
      lineTension: 0.1,
      borderJoinStyle: "miter",
      data: data2
    },
    {
      label: "Bank of the Philippine Island",
      backgroundColor: "transparent",
      borderColor: brandDanger,
      pointHoverBackgroundColor: "#fff",
      borderWidth: 2,
      lineTension: 0.1,
      borderJoinStyle: "miter",
      data: data3
    },
    {
      label: "Union Bank",
      backgroundColor: "transparent",
      borderColor: brandWarning,
      pointHoverBackgroundColor: "#fff",
      borderWidth: 2,
      lineTension: 0.1,
      borderJoinStyle: "miter",
      data: data4
    },
    {
      label: "Banko De Oro",
      backgroundColor: "transparent",
      borderColor: brandPrimary,
      pointHoverBackgroundColor: "#fff",
      borderWidth: 2,
      lineTension: 0.1,
      borderJoinStyle: "miter",
      data: data5
    }
  ]
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: "index",
    position: "nearest",
    callbacks: {
      labelColor: function (tooltipItem, chart) {
        return {
          backgroundColor:
            chart.data.datasets[tooltipItem.datasetIndex].borderColor
        };
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250
        }
      }
    ]
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3
    }
  }
};


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected
    });
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    return (
      <div className="animated fadeIn">
        <Row>

          <Col>
            <Card style={cardStyle}>
              <CardHeader className="mb-0">Transactions</CardHeader>
              <CardBody>
                <Col xs="12" md="12" xl="12">
                  {/* <Graph
                    id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                    data={data}
                    config={myConfig}
                    onClickNode={onClickNode}
                    onRightClickNode={onRightClickNode}
                    onClickGraph={onClickGraph}
                    onClickLink={onClickLink}
                    onRightClickLink={onRightClickLink}
                    onMouseOverNode={onMouseOverNode}
                    onMouseOutNode={onMouseOutNode}
                    onMouseOverLink={onMouseOverLink}
                    onMouseOutLink={onMouseOutLink}
                  /> */}
                  <script src="//unpkg.com/three"></script>
                  <script src="//unpkg.com/three-spritetext"></script>
                  
                  <ForceGraph2D
                    graphData={data}
                    nodeLabel="id"
                    nodeAutoColorBy="group"
                    linkDirectionalParticles="value"
                    linkCurvature="curvature"
                    linkDirectionalParticleSpeed={d => d.value * 0.001}
                  />
                </Col>
              </CardBody>
            </Card>
            <Card>
              <CardHeader className="mb-0">
                Daily Bank Transactions
                <div className="small text-muted">Bank Hours: 8am - 4pm</div>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" md="12" xl="12">
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          <Link to="/users" style={styles.link}>
                            UCPB
                          </Link>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <div>
                          <Progress
                            className="progress-sm mt-2"
                            color="success"
                            value="34"
                          />
                          <div className="float-right">
                            <small className="text-muted">34%</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          <Link to="/users" style={styles.link}>
                            Security Bank
                          </Link>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <div>
                          <Progress
                            className="progress-sm mt-2"
                            color="info"
                            value="45"
                          />
                          <div className="float-right">
                            <div className="float-right">
                              <small className="text-muted">45%</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          <Link to="/users" style={styles.link}>
                            UnionBank
                          </Link>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <div>
                          <Progress
                            className="progress-sm mt-2"
                            color="warning"
                            value="78"
                          />
                          <div className="float-right">
                            <small className="text-muted">78%</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          <Link to="/users" style={styles.link}>
                            BPI
                          </Link>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <div>
                          <Progress
                            className="progress-sm mt-2"
                            color="danger"
                            value="50"
                          />
                          <div className="float-right">
                            <small className="text-muted">50%</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          <Link to="/users" style={styles.link}>
                            BDO
                          </Link>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <div>
                          <Progress
                            className="progress-sm mt-2"
                            color="primary"
                            value="70"
                          />
                          <div className="float-right">
                            <small className="text-muted">70%</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>
    );
  }
}

export default Dashboard;

