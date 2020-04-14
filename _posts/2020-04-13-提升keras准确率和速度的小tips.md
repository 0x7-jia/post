---
layout: post
title: '提升keras准确率和速度的小tips'
date: 2020-04-13 22:22
categories: ['转载', 'Kears', 'Python']
permalink: /post/提升keras准确率和速度的小tips
nocomments: true
showExcerpt: true
excerpt: '这里记录一下对于新手(对,说的就是本人)学习kears框架时用来提升准确率的一些tip,但这里都是”术”的层面,而对于”道”,还是要看数学.全文以深度学习界的”hello world”-手写数字识别为例.'
---

这里记录一下对于新手(对,说的就是本人)学习kears框架时用来提升准确率的一些tip,但这里都是”术”的层面,而对于”道”,还是要看数学.全文以深度学习界的”hello world”-<a href='http://yann.lecun.com/exdb/mnist/' target='_blank' class='high-a'>手写数字识别</a>为例.

首先载入所需要的库:
{% highlight Python %}
import numpy as np
from keras.datasets import mnist
from keras.optimizers import SGD
from keras.utils import np_utils
from keras.models import Sequential
from keras.layers.core import Dense,Dropout,Activation
{% endhighlight %}

然后编写函数加载数据:

{% highlight Python %}
def load_data():
  (x_train,y_train),(x_test,y_test) = mnist.load_data()
  number = 10000
  x_train = x_train[:number] # 完整训练数据有6w,这里取前1w
  y_train = y_train[:number]  
  x_train = x_train.reshape(number,28*28) # 原始数据是3维,这里变成2维
  x_test=x_test.reshape(x_test.shape[0],28*28)
  x_train = x_train.astype('float32')
  x_test = x_test.astype('float32')
  y_train = np_utils.to_categorical(y_train,10) # 原始数据是1,2...9这样的数字,to_categorical将其变成向量,对应的数字位置为1,其余为0
  y_test = np_utils.to_categorical(y_test,10)
  x_train = x_train / 255
  x_test = x_test / 255
  return (x_train,y_train),(x_test,y_test)

(x_train,y_train),(x_test,y_test) = load_data()
{% endhighlight %}

## 选择合适的loss函数

对于loss函数,如果之前有学过经典机器学习的小伙伴一定最熟悉MSE(均方误差),所以先用这个实现一个版本:

{% highlight Python %}
model = Sequential()
model.add(Dense(input_dim=28*28,units=689,activation='sigmoid'))
model.add(Dense(units=689,activation='sigmoid'))
model.add(Dense(units=689,activation='sigmoid'))
model.add(Dense(units=10,activation='softmax')) # 输出层10个节点
model.compile(loss='mse',optimizer=SGD(lr=0.1),metrics=['accuracy'])
model.fit(x_train,y_train,batch_size=100,epochs=20)

train_result = model.evaluate(x_train,y_train,batch_size=10000)
test_result = model.evaluate(x_test,y_test,batch_size=10000)
print('Train Accc:',train_result[1])
print('Test Accc:',test_result[1])
{% endhighlight %}

这里activation函数使用`sigmoid`,optimizer使用SGD(随机梯度下降),loss选择MSE,2个隐藏层,隐藏层节点数量689,程序输出如下:

~~~
Train Accc: 0.12860000133514404
Test Accc: 0.1362999975681305
~~~

这里可以看出,基本凉凉.不论是在测试集还是训练集准确度都很低.但是,如果把loss函数换成`categorical_crossentropy`,输出就变成:

~~~
Train Accc: 0.8550000190734863
Test Accc: 0.8374000191688538
~~~

很明显的提升,这也说明,MSE对于分类问题不是很有好.

## 合适的隐藏层数量

对于初学者有种幻想,层数越多精度就会越高.这里增加一下层数试试:

{% highlight Python %}
model = Sequential()
model.add(Dense(input_dim=28*28,units=689,activation='sigmoid'))
for _ in range(10):
    model.add(Dense(units=689,activation='sigmoid')) # 来个10层
model.add(Dense(units=10,activation='softmax')) # 输出层10个节点
model.compile(loss='categorical_crossentropy',optimizer=SGD(lr=0.1),metrics=['accuracy'])
model.fit(x_train,y_train,batch_size=100,epochs=20)

train_result = model.evaluate(x_train,y_train,batch_size=10000)
test_result = model.evaluate(x_test,y_test,batch_size=10000)
print('Train Accc:',train_result[1])
print('Test Accc:',test_result[1])
{% endhighlight %}

结果如下:

~~~
Train Accc: 0.09910000115633011
Test Accc: 0.10320000350475311
~~~

WTF?!准确度反而降低了??这里其实和`sigmoid`这个函数有关,这个函数会导致**vanish gradient problem**.简言之就是使用这个函数进行训练时层数越多,每次参数变化引起结果变化的程度就越小,因为`sigmoid`函数会把不论大小的输入都转化到0-1这个区间中,具体看其 <a href='https://baike.baidu.com/item/Sigmoid%E5%87%BD%E6%95%B0' target='_blank' class='high-a'>函数图像</a> 就可以明白了.

## 合适的激活函数

`sigmoid`函数其实比较少用了,现在更常用的是`relu`函数,可以避免**vanish gradient problem**.此外,`relu`其实是`Maxout`的一个特例:

{% highlight Python %}
model = Sequential()
model.add(Dense(input_dim=28*28,units=689,activation='relu'))
for _ in range(10):
    model.add(Dense(units=689,activation='relu')) # 来个10层
model.add(Dense(units=10,activation='softmax')) # 输出层10个节点
model.compile(loss='categorical_crossentropy',optimizer=SGD(lr=0.1),metrics=['accuracy'])
model.fit(x_train,y_train,batch_size=100,epochs=20)

train_result = model.evaluate(x_train,y_train,batch_size=10000)
test_result = model.evaluate(x_test,y_test,batch_size=10000)
print('Train Accc:',train_result[1])
print('Test Accc:',test_result[1])
{% endhighlight %}

结果如下,可以看到增加10层使用`relu`函数不受影响.

~~~
Train Accc: 0.9959999918937683
Test Accc: 0.9541000127792358
~~~

## 合适的batch_size

batch_size影响每次训练使用的数据量,比如极端情况下:

{% highlight Python %}
model = Sequential()
model.add(Dense(input_dim=28*28,units=689,activation='relu'))
for _ in range(10):
    model.add(Dense(units=689,activation='relu')) # 来个10层
model.add(Dense(units=10,activation='softmax')) # 输出层10个节点
model.compile(loss='categorical_crossentropy',optimizer=SGD(lr=0.1),metrics=['accuracy'])
model.fit(x_train,y_train,batch_size=10000,epochs=20)

train_result = model.evaluate(x_train,y_train,batch_size=10000)
test_result = model.evaluate(x_test,y_test,batch_size=10000)
print('Train Accc:',train_result[1])
print('Test Accc:',test_result[1])
{% endhighlight %}

这里把batch_size的值改成和整个训练集一样大,结果如下:

~~~
Train Accc: 0.2732999920845032
Test Accc: 0.26249998807907104
~~~

又凉凉了,所以 **batch_size** 过大速度快,但会影响精度.而过小则速度会慢,特别是使用GPU的时候,如果这个值设定的过小不能完全发挥GPU的加速功能.

## 合适的optimizer

目前最常用的优化函数是`adam`,`adam=RMSProp+Momentum`,这里替换掉SGD:

{% highlight Python %}
model = Sequential()
model.add(Dense(input_dim=28*28,units=689,activation='relu'))
for _ in range(10):
    model.add(Dense(units=689,activation='relu')) # 来个10层
model.add(Dense(units=10,activation='softmax')) # 输出层10个节点
model.compile(loss='categorical_crossentropy',optimizer='adam',metrics=['accuracy'])
model.fit(x_train,y_train,batch_size=100,epochs=20)

train_result = model.evaluate(x_train,y_train,batch_size=10000)
test_result = model.evaluate(x_test,y_test,batch_size=10000)
print('Train Accc:',train_result[1])
print('Test Accc:',test_result[1])
{% endhighlight %}

输出如下,精度差不多但是训练的速度提升了很多:

~~~
Train Accc: 0.9906999754905701
Test Accc: 0.9217000007629395
~~~

## Dropout层

当训练样本过少时候,往往会出现过拟合的现象,这时可以使用Dropout层来”限制学习能力”.这个方法原理是在每次更新参数之前根据概率丢掉某些neuron,使整个网络结构发生了改变,在每一个mini-batch上重复这个行为,得到不同的结果,相当于训练出了很多个不同的网络,然后再把结果平均得到最终结果(ensemble的理念).这个方法会降低在训练集上的精准度.

为了模拟过拟合,我们在处理数据集时候添加噪声:

{% highlight Python %}
def load_data():
  (x_train,y_train),(x_test,y_test) = mnist.load_data()
  number = 10000
  x_train = x_train[:number] # 完整训练数据有6w,这里取前1w
  y_train = y_train[:number]  
  x_train = x_train.reshape(number,28*28) # 原始数据是3维,这里变成2维
  x_test=x_test.reshape(x_test.shape[0],28*28)
  x_train = x_train.astype('float32')
  x_test = x_test.astype('float32')
  y_train = np_utils.to_categorical(y_train,10) # 原始数据是1,2...9这样的数字,to_categorical将其变成向量,对应的数字位置为1,其余为0
  y_test = np_utils.to_categorical(y_test,10)
  x_train = x_train / 255
  x_test = x_test / 255
  x_test=np.random.normal(x_test) # 加噪声
  return (x_train,y_train),(x_test,y_test)

(x_train,y_train),(x_test,y_test) = load_data()
{% endhighlight %}

然后经过2层`relu`+`adam`+`categorical_crossentropy`+`batch_size=100`结果如下:

~~~
Train Accc: 0.9894000291824341
Test Accc:  0.5034999847412109
~~~

可以看到训练集精度很高而测试集准确度一般,添加Dropout层:

{% highlight Python %}
model = Sequential()
model.add(Dense(input_dim=28*28,units=689,activation='relu'))
model.add(Dropout(0.7))
model.add(Dense(units=689,activation='relu'))
model.add(Dropout(0.7))
model.add(Dense(units=689,activation='relu'))
model.add(Dropout(0.7))
model.add(Dense(units=10,activation='softmax')) # 输出层10个节点
model.compile(loss='categorical_crossentropy',optimizer='adam',metrics=['accuracy'])
model.fit(x_train,y_train,batch_size=100,epochs=20)

train_result = model.evaluate(x_train,y_train,batch_size=10000)
test_result = model.evaluate(x_test,y_test,batch_size=10000)
print('Train Accc:',train_result[1])
print('Test Accc:',test_result[1])
{% endhighlight %}

其中Dropout层添加到每个隐藏层之间,常用的概率值是0.5左右,结果如下:

~~~
Train Accc: 0.9824030212854031
Test Accc: 0.6224999713897705
~~~

可以看到测试集精度提升了一些.当然,除了Dropout之外可以 <a href='https://keras.io/getting-started/faq/#how-can-i-interrupt-training-when-the-validation-loss-isnt-decreasing-anymore' target='_blank' class='high-a'>Early Stopping</a> 和Regularization(正则化,简单说就是使用某种方法使结果越来越接近0,Weight Decay,但这个帮助并不显著.)

## 特征工程!

在上面的测试准确率可以达到90%以上,但细心的小伙伴应该发现了,在加载数据时候有这样2行代码:

{% highlight Python %}
x_train = x_train / 255
x_test = x_test / 255
{% endhighlight %}

这两行代码就是对原始数据进行了缩放,将原始值在0-255之间的数据转化到0-1这个区间.如果没有这个处理,那么依然使用2层`relu`+`adam`+`categorical_crossentropy`+`batch_size`=100结果如下:

~~~
Train Accc: 0.10010000318288803
Test Accc: 0.09799999743700027
~~~

准确度居然降到和`sigmoid`+`SGD`+`mse`差不多的程度.所以,如果当程序在训练集上的准确度都很低的话,除了调整参数还需要进一步考虑特征工程是否合理合适了.

<ul class='post-copyright'>
  <li class='post-copyright-author'>
    <strong>原文作者： </strong><a href='https://www.hi-roy.com/' target='_blank'>Roy</a></li>
  <li class='post-copyright-link'>
    <strong>原文链接：</strong>
    <a href='https://www.hi-roy.com/2019/03/14/%E6%8F%90%E5%8D%87keras%E5%87%86%E7%A1%AE%E7%8E%87%E5%92%8C%E9%80%9F%E5%BA%A6%E7%9A%84tips/' title='{{ page.title }}' target='_blank'>https://www.hi-roy.com/2019/03/14/提升keras准确率和速度的小tips/</a></li>
</ul>