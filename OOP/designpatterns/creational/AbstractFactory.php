<?php

namespace DesignPatterns\Creational\AbstractFactory;

/**
 * 抽象工厂
 * 目的:
 * 在不指定具体类的情况下创建一系列相关或依赖对象。
 * 通常创建的类都实现相同的接口。 抽象工厂的客户并不关心这些对象是如何创建的，它只是知道它们是如何一起运行的。
 */
abstract class AbstractFactory
{
    abstract public function createText(string $content): Text;
}

/**
 * Json工厂
 * Class JsonFactory
 * @package DesignPatterns\Creational\AbstractFactory
 */
class JsonFactory extends AbstractFactory
{

    public function createText(string $content): Text
    {
        return new JsonText($content);
    }
}

/**
 * Html工厂
 * Class HtmlFactory
 * @package DesignPatterns\Creational\AbstractFactory
 */
class HtmlFactory extends AbstractFactory
{

    public function createText(string $content): Text
    {
        return new HtmlText($content);
    }
}

abstract class Text
{
    private $text;

    public function __construct(string $text)
    {
        $this->text = $text;
    }
}

class  JsonText extends Text
{
    // 你的代码逻辑
}

class HtmlText extends Text
{
    // 你的代码逻辑
}


$factory = new JsonFactory();
$text    = $factory->createText('foobar');
var_dump(get_class($text) === JsonText::class);
