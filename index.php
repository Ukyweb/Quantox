<!DOCTYPE html>
<html>
<head>
    <title>Place searches</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="js/main.js"></script>

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDEWG4Ce1vMvFWc6UsXeG5Diow325qtb20&libraries=places" async defer></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>

<div class="container">
    <h2>Test</h2>
    <div class="btns clearfix">
        <button class="btn btn-primary" onclick="ascDesc();">Sort by meters</button>
        <button class="btn btn-primary" onclick="multiCur();">Work in progress</button>
    </div>
    <ul id="location" role="tablist" class="list-unstyled"></ul>
    <ol id="locationM" class="tab-content"></ol>
</div>

</body>
</html>