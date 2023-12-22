
// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import { Col, Row, Typography } from 'antd';

// const { Title } = Typography;

// const LineChart = ({ coinHistory, currentPrice, coinName }) => {
//   const coinPrice = [];
//   const coinTimestamp = [];

//   for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
//     coinPrice.push(coinHistory?.data?.history[i].price);
//   }

//   for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
//     coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
//   }
//   const data = {
//     labels: coinTimestamp,
//     datasets: [
//       {
//         label: 'Price In USD',
//         data: coinPrice,
//         fill: false,
//         backgroundColor: '#0071bd',
//         borderColor: '#0071bd',
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true,
//           },
//         },
//       ],
//     },
//   };

//   return (
//     <>
//       <Row className="chart-header">
//         <Title level={2} className="chart-title">{coinName} Price Chart </Title>
//         <Col className="price-container">
//           <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
//           <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
//         </Col>
//       </Row>
//       <Line data={data} options={options} />
//     </>
//   );
// };

// export default LineChart;
import React from 'react';
import 'chart.js/auto';
import {Chart} from 'react-chartjs-2';

// import { Line } from 'react-chartjs-2';

import {Col, Row, Typography} from 'antd';
import moment from 'moment';

const {Title: AnTitle} = Typography;

const LineChart = ({coinHistory, currentPrice, coinName, coinColor}) => {
    const coinPrice = [];
    const coinTimestamp = [];

    for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
        coinPrice.push(coinHistory?.data?.history[i].price);
    }

    for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
        //      coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
        coinTimestamp.push(moment(coinHistory.data.history[i].timestamp * 1000).format('Do MMMM, \'YY (HH:mm)'))
    }

    coinPrice.reverse()
    coinTimestamp.reverse()

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: `${coinName} Price in USD`,
                data: coinPrice,
                fill: false,
                backgroundColor: '#ff8100',
                borderColor: '#0e0e0e',
                // backgroundColor: '#ff8100',
                // borderColor: '#0e0e0e',
            },
        ],
    };

    const options = {
        // responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#0e0e0e'
                }
            }
        },
        scales: {
            x: {
                display: false
            },
            y: {
                ticks: {
                    display: false
                }
            }
        }
    }

    // console.log(coinHistory, coinPrice, coinTimestamp)

    return (
        <>
            <Row className="chart-header">
                <AnTitle level={2} className="chart-title">{coinName} Price Chart </AnTitle>
                <Col className="price-container">
                    <AnTitle level={5} className="price-change">Change: {coinHistory?.data?.change}%</AnTitle>
                    <AnTitle level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</AnTitle>
                </Col>
            </Row>
            {/* <Line data={data} /> */}
            <Chart type='line' options={options} data={data}/>
        </>
    );
};

export default LineChart;