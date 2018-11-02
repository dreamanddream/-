<?php
   // header("Content-type: text/html; charset=utf-8");
    $callback = $_GET["callback"];
    $json=array(
        'success'=>false,
        'message'=>'请求成功',
        'data'=>'欢迎来到华宇',
        'code'=>200
    );
    $result=json_encode($json);
    echo "$callback($result)"; // (三)
?>