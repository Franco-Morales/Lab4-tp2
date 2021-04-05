<?php
    include('./app.php');
    $data = [];

    if($_POST) {
        if($_POST['set'] == true) {
            setDataFromApi();
        }
    }

    if($_GET) {
        if($_GET['delete']==true){
            deleteAllPaises();
        }
    }

    $data = getAllPaises();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
        integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
    <title>Tp 2 parte A</title>
</head>

<body>
    <div class="container mt-5">
        <div class="row">
            <div class="col-12">
                <h1>Tp 2 parte A</h1>
            </div>
            <div class="col-12 my-3">
                <p>Total de datos: <?= count($data) ?></p>
                <?php if(count($data) != 0): ?>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Código Pais</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Capital</th>
                            <th scope="col">Poblacion</th>
                            <th scope="col">Latitud</th>
                            <th scope="col">Longitud</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach($data as $key => $value): ?>
                        <tr>
                            <th scope="row"><?= $value['codPais']; ?></th>
                            <td><?= $value['nombre']; ?></td>
                            <td><?= $value['capital']; ?></td>
                            <td><?= $value['poblacion']; ?></td>
                            <td><?= $value['lat']; ?></td>
                            <td><?= $value['lng']; ?></td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
                <form action="index.php" method="get">
                    <div class="form-row">
                        <div class="col-lg-6">
                            <input type="text" name="delete" hidden value="true">
                            <button type="submit" class="btn btn-danger">Eliminar Dato</button>
                        </div>
                    </div>
                </form>
                <?php else: ?>
                <p class="mt-5">No hay datos cargados</p>
                <form action="index.php" method="post">
                    <div class="form-row">
                        <div class="col-lg-6">
                            <input type="text" name="set" hidden value="true">
                            <button type="submit" class="btn btn-primary">Cargar Datos</button>
                        </div>
                    </div>
                </form>
                <?php endif; ?>
            </div>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous">
    </script>
</body>
</html>