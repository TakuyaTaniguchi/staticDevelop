import './style.scss';
// import 文を使って sub.js ファイルを読み込む。
import { hello } from './sub';

// sub.jsに定義されたJavaScriptを実行する。
hello();

function func() {
  let x = 1;
  let y = 2;
  return { x, y };
}

console.log(func());
