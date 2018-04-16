<?php


namespace DesignPatterns\Creational\Builder;

/**
 * [建造者]
 * 建造者是创建一个复杂对象的一部分接口。
 * Class Builder
 * @package DesignPatterns\Creational\Builder
 */

class Builder
{
}

/**
 * Director 类是建造者模式的一部分。 它可以实现建造者模式的接口
 * 并在构建器的帮助下构建一个复杂的对象
 *
 * 您也可以注入许多构建器而不是构建更复杂的对象
 */
class Director
{
    public static function build(BuilderInterface $builder): Vehicle
    {
        $builder->createVehicle();
        $builder->addDoors();
        $builder->addEngine();
        $builder->addWheel();

        return $builder->getVehicle();
    }
}

interface BuilderInterface
{
    public function createVehicle();

    public function addWheel();

    public function addEngine();

    public function addDoors();

    public function getVehicle(): Vehicle;
}

/**
 * 货车建造类
 * Class TruckBuilder
 * @package DesignPatterns\Creational\Builder
 */
class TruckBuilder implements BuilderInterface
{

    private $truck;

    public function createVehicle()
    {
        $this->truck = new Truck();
    }

    public function addWheel()
    {
        $this->truck->setPart('轮子1', new Wheel());
        $this->truck->setPart('轮子2', new Wheel());
        $this->truck->setPart('轮子3', new Wheel());
        $this->truck->setPart('轮子4', new Wheel());
        $this->truck->setPart('备胎1', new Wheel());
        $this->truck->setPart('备胎2', new Wheel());
    }

    public function addEngine()
    {
        $this->truck->setPart('货车引擎', new Engine());
    }

    public function addDoors()
    {
        $this->truck->setPart('左门', new Door());
        $this->truck->setPart('右门', new Door());
    }

    public function getVehicle(): Vehicle
    {
        return $this->truck;
    }
}

/**
 * 小轿车建造类
 * Class CarBuilder
 * @package DesignPatterns\Creational\Builder
 */
class CarBuilder implements BuilderInterface
{

    private $car;

    public function createVehicle()
    {
        $this->car = new Car();
    }

    public function addWheel()
    {
        $this->car->setPart('轮子1', new Wheel());
        $this->car->setPart('轮子2', new Wheel());
        $this->car->setPart('轮子3', new Wheel());
        $this->car->setPart('轮子4', new Wheel());
        $this->car->setPart('备胎1', new Wheel());
    }

    public function addEngine()
    {
        $this->car->setPart('轿车引擎', new Engine());
    }

    public function addDoors()
    {
        $this->car->setPart('左门', new Door());
        $this->car->setPart('右门', new Door());
        $this->car->setPart('后备箱', new Door());
    }

    public function getVehicle(): Vehicle
    {
        return $this->car;
    }
}

/**
 * 交通工具抽象类
 * Class Vehicle
 * @package DesignPatterns\Creational\Builder
 */
abstract class Vehicle
{
    private $data = [];

    /**
     * @param string $key
     * @param object $value
     */
    public function setPart(string $key, $value)
    {
        $this->data[$key] = $value;
    }
}

/**
 * 卡车类
 * Class Truck
 * @package DesignPatterns\Creational\Builder
 */
class Truck extends Vehicle
{

}

/**
 * 轿车类
 * Class Car
 * @package DesignPatterns\Creational\Builder
 */
class Car extends Vehicle
{

}

/**
 * 引擎
 * Class Engine
 * @package DesignPatterns\Creational\Builder
 */
class Engine
{

}

/**
 * 轮子
 * Class Wheel
 * @package DesignPatterns\Creational\Builder
 */
class Wheel
{

}

/**
 * 车门
 * Class Door
 * @package DesignPatterns\Creational\Builder
 */
class Door
{

}


$truckBuilder = new TruckBuilder();
$truck        = Director::build($truckBuilder);
var_dump(get_class($truck) === Truck::class);

$carBuilder = new CarBuilder();
$car        = Director::build($carBuilder);
var_dump(get_class($car) === Car::class);