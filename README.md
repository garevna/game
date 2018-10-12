# :clipboard: Инструкция

## :person_with_blond_hair: Как создать хорошего парня:
```javascript
var guy = document.body.appendChild (
    document.createElement ( 'good-boy' )
)
```
## :japanese_ogre: Как создать плохого парня:
```javascript
var scamp = document.body.appendChild (
    document.createElement ( 'bad-boy' )
)
```

## :two_men_holding_hands: Методы персонажей

### :older_man: Поменять картинку
```javascript
guy.setImage ( personages [3] )
```
##### В вашем распоряжении куча персонажей

Это элементы массива **`personages`**

| | | |
|-|-|-|
| **1** ![](https://github.com/garevna/game/blob/master/personages/01.gif?raw=true)| **2** ![](https://github.com/garevna/game/blob/master/personages/05.gif?raw=true)| **3** ![](https://github.com/garevna/game/blob/master/personages/31.gif?raw=true) |
| **4** ![](https://github.com/garevna/game/blob/master/personages/32.gif?raw=true) | **5** ![](https://github.com/garevna/game/blob/master/personages/33.gif?raw=true)| **6** ![](https://github.com/garevna/game/blob/master/personages/21.gif?raw=true) |
| **7** ![](https://github.com/garevna/game/blob/master/personages/34.gif?raw=true) | **8** ![](https://github.com/garevna/game/blob/master/personages/07.gif?raw=true) | **9** ![](https://github.com/garevna/game/blob/master/personages/10-2.gif?raw=true) |
| **10** ![](https://github.com/garevna/game/blob/master/personages/36.gif?raw=true) | **11** ![](https://github.com/garevna/game/blob/master/personages/28.gif?raw=true) | **12** ![](https://github.com/garevna/game/blob/master/personages/29-1.gif?raw=true) |
| **13** ![](https://github.com/garevna/game/blob/master/personages/30.gif?raw=true) | **14** ![](https://github.com/garevna/game/blob/master/personages/26.gif?raw=true) | **15** ![](https://github.com/garevna/game/blob/master/personages/37.gif?raw=true) |
| **16** ![](https://github.com/garevna/game/blob/master/personages/24.gif?raw=true) | **17** ![](https://github.com/garevna/game/blob/master/personages/23.gif?raw=true) | **18** ![](https://github.com/garevna/game/blob/master/personages/22.gif?raw=true) |
| **19** ![](https://github.com/garevna/game/blob/master/personages/27.gif?raw=true) | **20** ![](https://github.com/garevna/game/blob/master/personages/25.gif?raw=true) | **21** ![](https://github.com/garevna/game/blob/master/personages/13.gif?raw=true) |
| **22** ![](https://github.com/garevna/game/blob/master/personages/15.gif?raw=true) | **23** ![](https://github.com/garevna/game/blob/master/personages/11.gif?raw=true) | **24** ![](https://github.com/garevna/game/blob/master/personages/09.gif?raw=true) |
| **25** ![](https://github.com/garevna/game/blob/master/personages/38.gif?raw=true) | **26** ![](https://github.com/garevna/game/blob/master/personages/02.gif?raw=true) | **27** ![](https://github.com/garevna/game/blob/master/personages/12.gif?raw=true) |
| **28** ![](https://github.com/garevna/game/blob/master/personages/14.gif?raw=true) |

<!-- [personages [29]](https://github.com/garevna/game/blob/master/personages/17.gif?raw=true) -->

### :triangular_ruler: Изменить ( установить ) размер `( высоту персонажа )`

```javascript
guy.setHeight ( 200 )
```

### :pushpin: Зафиксировать относительное положение `( используется для пересчета координат персонажа при изменении размеров окна браузера )`
```javascript
guy.getRelativePosition ()
```

## :rage1: Итак, чтобы создать персонажа, нужно:

1. Создать элемент и вставить на страницу
2. Установить размер ( высоту )
3. Задать изображение для персонажа
4. Зафиксировать его относительные координаты

```javascript
badBoy = document.createElement ( 'bad-boy' )
document.body.appendChild ( badBoy )
badBoy.setImage ( personages [5] )
badBoy.setHeight ( 200 )
badBoy.getRelativePosition ()
```

Все остальное у него будет :smirk:
