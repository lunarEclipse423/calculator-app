# Calculator App

Простой калькулятор, созданный с использованием HTML, SCSS и JavaScript.

![Calculator App](https://user-images.githubusercontent.com/61159646/190432486-4ef2ecc9-7811-42a3-bf66-ef63ce055e73.png)

## Функционал приложения

- Сложение, вычитание, деление, умножение нескольких чисел
- Вычисление процента
- Смена знака
- Операции с нецелыми числами
- Очистка экрана
- Удаление последнего введенного символа
> Примечание #1: логика вычисления процента базировалась на логике встроенного калькулятора операционной системы Windows, поэтому следующие вычисления считаются корректными:  
> 120 + 10% = 132  
> 120 * 10% = 12  
> 120% = 0  
> 120 + 10%% = 134,4  
> 100 + 15% * 3 = 345  

Данный калькулятор поддерживает ввод с клавиатуры. Кроме того, есть возможность переключения между светлой и темной темой. Адаптивная версия временно отсутствует.
> Примечание #2: numpad не поддерживается, взаимодействие с его помощью не предусмотрено.

### Сочетания клавиш

- AC - очистить ввод - <kbd>Ctrl</kbd> + <kbd>C</kbd>
- CE - стереть символ - <kbd>Backspace</kbd>
- ÷ - деление - <kbd>/</kbd>
- × - умножение - <kbd>Shift</kbd> + <kbd>8</kbd>
- \- - вычитание - <kbd>-</kbd>
- \+ - сложение - <kbd>Shift</kbd> + <kbd>=</kbd>
- = - равно - <kbd>=</kbd>
- . - разделитель - <kbd>.</kbd>
- % - процент - <kbd>Shift</kbd> + <kbd>5</kbd>
- +/- - смена знака - <kbd>Shift</kbd> + <kbd>-</kbd>

Ожидается английская раскладка, поэтому точка и слэш будут расположены на соответствующих кнопках.

## Дополнительно

[Дизайн калькулятора (figma)](https://www.figma.com/community/file/1138972240395739631)  
[Демо](https://lunareclipse423.github.io/calculator-app/)  
