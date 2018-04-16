<?php


namespace DesignPatterns\Creational\FactoryMethod;


/**
 * Class FactoryMethod
 * @package DesignPatterns\Creational\FactoryMethod
 * 对比简单工厂模式的优点是，您可以将其子类用不同的方法来创建一个对象。
 *
 * 举一个简单的例子，这个抽象类可能只是一个接口。
 *
 * 这种模式是「真正」的设计模式， 因为他实现了S.O.L.I.D原则中「D」的 「依赖倒置」。
 *
 * 这意味着工厂方法模式取决于抽象类，而不是具体的类。 这是与简单工厂模式和静态工厂模式相比的优势。
 */
abstract class FactoryMethod
{

    const CHEAP = 'cheap';
    const FAST = 'fast';

    abstract protected function createVehicle(string $type): VehicleInterface;

    public function create(string $type): VehicleInterface
    {
        $vehicle = $this->createVehicle($type);
        $vehicle->setColor('black');

        return $vehicle;
    }

}

/**
 * 🇮🇹意大利工厂
 * Class ItalianFactory
 * @package DesignPatterns\Creational\FactoryMethod
 */
class ItalianFactory extends FactoryMethod
{
    protected function createVehicle(string $type): VehicleInterface
    {
        switch ($type) {
            case parent::CHEAP:
                return new Bicycle();
                break;
            case parent::FAST:
                return new CarFerrari();
                break;
            default:
                throw new \InvalidArgumentException("$type is not a valid vehicle");
                break;
        }
    }
}

/**
 * 🇩🇪德国工厂
 * Class GermanFactory
 * @package DesignPatterns\Creational\FactoryMethod
 */
class GermanFactory extends FactoryMethod
{

    protected function createVehicle(string $type): VehicleInterface
    {
        switch ($type) {
            case parent::CHEAP:
                return new Bicycle();
                break;
            case parent::FAST:
                $carMercedes = new CarMercedes();
                $carMercedes->addAMGTuning();

                return $carMercedes;
                break;
            default:
                throw new \InvalidArgumentException("$type is not a valid vehicle");
        }
    }
}

/**
 * 交通工具接口
 * Interface VehicleInterface
 * @package DesignPatterns\Creational\FactoryMethod
 */
interface VehicleInterface
{
    public function setColor(string $rgb);
}

/**
 * 奔驰-梅赛德斯
 * Class CarMercedes
 * @package DesignPatterns\Creational\FactoryMethod
 */
class CarMercedes implements VehicleInterface
{
    private $color;

    public function setColor(string $rgb)
    {
        $this->color = $rgb;
    }

    public function addAMGTuning()
    {
        // 在这里做额外的调整
    }
}

/**
 * 法拉利
 * Class CarFerrari
 * @package DesignPatterns\Creational\FactoryMethod
 */
class CarFerrari implements VehicleInterface
{
    private $color;

    public function setColor(string $rgb)
    {
        $this->color = $rgb;
    }
}

/**
 * 自行车
 * Class Bicycle
 * @package DesignPatterns\Creational\FactoryMethod
 */
class Bicycle implements VehicleInterface
{
    private $color;

    public function setColor(string $rgb)
    {
        $this->color = $rgb;
    }
}


$factory = new ItalianFactory();
$ferrari = $factory->create(FactoryMethod::FAST);
$ferrari->setColor('黄色');
var_dump(get_class($ferrari) === CarFerrari::class);

