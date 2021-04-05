<?php
    set_time_limit(10000);
    error_reporting(0);

    function connect() {
        $user = "root";
        $password = "";
        $opt = [PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION];
        try {
            $db = new PDO('mysql:host=localhost;dbname=tp2_a', $user, $password, $opt);
            return $db;
        } catch (PDOException $e) {
            print "¡Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    function getAllPaises() {
        $db = connect();
        $query = $db->prepare("SELECT * FROM pais ORDER BY codPais ASC");
        $query->execute();
        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    function deleteAllPaises() {
        $db = connect();
        $query = $db->prepare("DELETE FROM pais");
        $query->execute();
    }

    function setDataFromApi() {
        $url = "https://restcountries.eu/rest/v2/callingcode/";
        for ($i=1; $i < 300; $i++) { 
            try {
                $res = file_get_contents($url.$i);
                $data = json_decode($res,true);
                
                if($data != null){
                    foreach ($data as $key => $value) {
                        $pais = [
                            $value['numericCode'],
                            $value['name'],
                            $value['capital'],
                            $value['region'],
                            $value['population'],
                            $value['latlng'][0],
                            $value['latlng'][1]
                        ];
                        transformData($pais);
                    }
                }
            } catch (Exception  $e) {
                echo $e."<br>";
                continue;
            }
        }
    }

    function transformData($array){
        list($codPais,$nombre,$capital,$region,$poblacion,$lat,$lng) = $array;

        try {
            $db = connect();
            $sql_select = "SELECT * FROM pais WHERE codPais='$codPais'";
            $stmt = $db->prepare($sql_select);
            $stmt->execute();
            $result = $stmt->rowCount();
            $stmt = null;
            if($result) {
                $sql_update = "UPDATE pais SET nombre='$nombre', region='$region', poblacion='$poblacion', lat='$lat', lng='$lng' WHERE codPais='$codPais'";
                $update = $db->prepare($sql_update);
                $update->execute();
            } else {
                $sql_insert = "INSERT INTO pais (codPais,nombre,capital,region,poblacion,lat,lng) VALUES (?,?,?,?,?,?,?)";
                $insert = $db->prepare($sql_insert);
                $insert->execute($array);
            }
            $db = null;
        } catch (PDOException $e) {
            print "¡Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }
?>