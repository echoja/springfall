"use client";

import { useState } from "react";

const FoodOrderApp = () => {
  const [jjamppong, setJjamppong] = useState(0);
  const [jjajangmyeon, setJjajangmyeon] = useState(0);

  const JJAMPPONG_PRICE = 7900;
  const JJAJANGMYEON_PRICE = 5900;
  const MIN_ORDER_AMOUNT = 15000;

  const total = jjamppong * JJAMPPONG_PRICE + jjajangmyeon * JJAJANGMYEON_PRICE;
  const isValidOrder = total >= MIN_ORDER_AMOUNT;

  const handleOrder = () => {
    console.log("주문 내역:", {
      짬뽕: jjamppong,
      짜장면: jjajangmyeon,
      총액: total,
    });
  };

  return (
    <>
      <style>
        {`
          .container {
            max-width: 400px;
            margin: 40px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
          }

          .title {
            font-size: 24px;
            margin-bottom: 20px;
            font-weight: bold;
          }

          .menu-item {
            margin: 15px 0;
            padding: 10px;
            border: 1px solid #eee;
            border-radius: 4px;
          }

          .quantity-controller {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 10px;
          }

          .quantity-input {
            width: 60px;
            padding: 5px;
            text-align: center;
          }

          .btn {
            padding: 5px 12px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            text-align: center;
          }

          .btn-control {
            background-color: #e2e2e2;
          }

          .btn-order {
            width: 100%;
            padding: 10px;
            background-color: #4A90E2;
            color: white;
            margin-top: 20px;
          }

          .btn-order:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
          }

          .total-price {
            margin-top: 20px;
            font-weight: bold;
          }

          .min-price {
            color: #666;
            font-size: 14px;
          }
        `}
      </style>

      <div className="container">
        <h2 className="title">음식 주문</h2>

        <div className="menu-item">
          <h3>짬뽕 (7,900원)</h3>
          <div className="quantity-controller">
            <button
              className="btn btn-control"
              onClick={() => setJjamppong(Math.max(0, jjamppong - 1))}
            >
              -
            </button>
            <input
              className="quantity-input"
              type="number"
              value={jjamppong}
              onChange={(e) =>
                setJjamppong(Math.max(0, parseInt(e.target.value) || 0))
              }
              min="0"
            />
            <button
              className="btn btn-control"
              onClick={() => setJjamppong(jjamppong + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="menu-item">
          <h3>짜장면 (5,900원)</h3>
          <div className="quantity-controller">
            <button
              className="btn btn-control"
              onClick={() => setJjajangmyeon(Math.max(0, jjajangmyeon - 1))}
            >
              -
            </button>
            <input
              className="quantity-input"
              type="number"
              value={jjajangmyeon}
              onChange={(e) =>
                setJjajangmyeon(Math.max(0, parseInt(e.target.value) || 0))
              }
              min="0"
            />
            <button
              className="btn btn-control"
              onClick={() => setJjajangmyeon(jjajangmyeon + 1)}
            >
              +
            </button>
          </div>
        </div>

        <p className="total-price">총 주문금액: {total.toLocaleString()}원</p>
        <p className="min-price">최소 주문금액: 15,000원</p>

        <button
          className="btn btn-order"
          onClick={handleOrder}
          disabled={!isValidOrder}
        >
          주문하기
        </button>
      </div>
    </>
  );
};

export default FoodOrderApp;
