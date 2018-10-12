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
##### В вашем распоряжении куча персонажей [:arrow_right_hook:](https://github.com/garevna/game/wiki)

Это элементы массива **`personages`**


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
