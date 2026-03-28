---
# src/content/posts/FFT.md
title: 傅里叶级数与傅里叶变换核心公式推导笔记
publishedAt: 2026-03-29T00:30:00+08:00 # 发布时间 (ISO 8601格式，含时区)
tags: ['math', 'signal-processing']
description: 本文整理了傅里叶级数（实数与复数形式）、傅里叶变换及其基本性质，并给出了从级数向积分形式过渡的完整推导过程。
---

本文整理了傅里叶级数（实数与复数形式）、傅里叶变换及其基本性质，并给出了从级数向积分形式过渡的完整推导过程。

## 一、 傅里叶级数 (Fourier Series)

> **前置条件**：函数 $f(x)$ 要求是周期性函数。
> **周期与角频率**：设周期 $T = 2l$，则基础角频率 $\omega_0 = \frac{2\pi}{2l} = \frac{\pi}{l}$。

### 1. 实数形式

周期函数 $f(x)$ 可以展开为三角级数：

$$f(x) = a_0 + \sum_{k=1}^{\infty} \left( a_k \cos \frac{k\pi x}{l} + b_k \sin \frac{k\pi x}{l} \right)$$

其中，各个系数的计算公式如下：

$$a_k = \frac{1}{\delta_k l} \int_{-l}^{l} f(\xi) \cos \frac{k\pi \xi}{l} d\xi$$

$$b_k = \frac{1}{l} \int_{-l}^{l} f(\xi) \sin \frac{k\pi \xi}{l} d\xi$$

这里引入了 $\delta_k$ 来统一直流分量 $a_0$ 与交流分量 $a_k$ 的表达式：
$$\delta_k = \begin{cases} 2, & k = 0 \\ 1, & k \ge 1 \end{cases}$$

### 2. 复数形式

利用欧拉公式将三角函数转化为指数形式，傅里叶级数可以写成更简洁的复数形式：

$$f(x) = \sum_{k=-\infty}^{\infty} c_k e^{i \frac{k\pi x}{l}}$$

复数系数 $c_k$ 为：
$$c_k = \frac{1}{2l} \int_{-l}^{l} f(\xi) e^{-i \frac{k\pi \xi}{l}} d\xi$$

**复数系数的推导过程：**
借助欧拉公式 $\cos \theta = \frac{e^{i\theta} + e^{-i\theta}}{2}$ 与 $\sin \theta = \frac{e^{i\theta} - e^{-i\theta}}{2i}$，代入实数形式的展开式中，可以提取出同次幂的系数：

$$\Rightarrow \frac{a_k - i b_k}{2} e^{i\theta} + \frac{a_k + i b_k}{2} e^{-i\theta}$$

对比复数形式 $c_k e^{i\theta} + c_{-k} e^{-i\theta}$，可得系数关系：

$$c_k = \frac{a_k - i b_k}{2}$$

$$c_{-k} = \frac{a_k + i b_k}{2}$$

---

## 二、 傅里叶积分与傅里叶变换

当周期 $T \to \infty$ 时，非周期函数可以看作周期无限大的周期函数，此时级数求和转化为积分。

### 1. 实数形式积分

$$f(x) = \int_{0}^{\infty} A(\omega) \cos \omega x \, d\omega + \int_{0}^{\infty} B(\omega) \sin \omega x \, d\omega$$

频谱密度函数为：

$$A(\omega) = \frac{1}{\pi} \int_{-\infty}^{\infty} f(\xi) \cos \omega \xi \, d\xi$$

$$B(\omega) = \frac{1}{\pi} \int_{-\infty}^{\infty} f(\xi) \sin \omega \xi \, d\xi$$

### 2. 复数形式变换 (傅里叶变换对)

傅里叶逆变换（时域表达）：

$$f(x) = \int_{-\infty}^{\infty} F(\omega) e^{i\omega x} d\omega$$

傅里叶正变换（频域表达）：

$$F(\omega) = \frac{1}{2\pi} \int_{-\infty}^{\infty} f(x) e^{-i\omega x} dx$$

---

## 三、 狄拉克 δ 函数 (Dirac Delta Function)

$\delta$ 函数在信号与系统分析中非常重要，其定义为：

$$\delta(x) = \begin{cases} 0, & x \neq 0 \\ \infty, & x = 0 \end{cases}$$

满足归一化条件：

$$\int_{-\infty}^{\infty} \delta(x) dx = \int_{0^-}^{0^+} \delta(x) dx = 1$$

其傅里叶变换为一个常数（即包含了所有频率成分）：

$$\delta(x) \leftrightarrow F(\omega) = \frac{1}{2\pi}$$

---

## 四、 傅里叶变换的常用性质

假设 $f(x) \leftrightarrow F(\omega)$，则有以下性质：

1. **微分与积分性质**

   $$f^{(n)}(x) \leftrightarrow (i\omega)^n F(\omega)$$

   $$f^{(-1)}(x) \leftrightarrow (i\omega)^{-1} F(\omega)$$

2. **尺度变换 (缩放性质)**

   $$f(ax) \leftrightarrow \frac{1}{|a|} F\left(\frac{\omega}{a}\right)$$

3. **时移与频移性质**

   * 时移：$f(x - x_0) \leftrightarrow F(\omega) e^{-i\omega x_0}$
   * 频移：$f(x) e^{i\omega_0 x} \leftrightarrow F(\omega - \omega_0)$

4. **卷积定理**

   时域的卷积等于频域的乘积（注意常数系数）：

   $$f_1(x) * f_2(x) \leftrightarrow 2\pi F_1(\omega) F_2(\omega)$$

   其中卷积定义为：

   $$f_1(x) * f_2(x) = \int_{-\infty}^{\infty} f_1(\xi) f_2(x-\xi) d\xi$$

---

## 五、 关于复数形式积分的推导

我们如何从**傅里叶级数**自然过渡到**傅里叶积分**？推导过程如下：

首先，将系数 $c_k$ 完整代入傅里叶级数公式中：

$$f(x) = \sum_{k=-\infty}^{\infty} \left[ \frac{1}{2l} \int_{-l}^{l} f(\xi) e^{-i \frac{k\pi \xi}{l}} d\xi \right] e^{i \frac{k\pi x}{l}}$$

定义频率间隔 $\Delta\omega$：

$$\Delta\omega = \omega_{k+1} - \omega_k = \frac{\pi}{l} \implies \frac{1}{l} = \frac{\Delta\omega}{\pi}$$

将 $\frac{1}{l}$ 替换掉，并将 $\frac{k\pi}{l}$ 记为 $\omega_k$：

$$f(x) = \frac{1}{2\pi} \sum_{k=-\infty}^{\infty} \left[ \int_{-l}^{l} f(\xi) e^{-i \omega_k \xi} d\xi \right] e^{i\omega_k x} \Delta\omega$$

当 $l \to \infty$ 时，频率间隔 $\Delta\omega \to d\omega$，离散的求和 $\sum$ 变成了连续的积分 $\int$：

$$\Rightarrow f(x) = \int_{-\infty}^{\infty} \left( \frac{1}{2\pi} \int_{-\infty}^{\infty} f(\xi) e^{-i\omega \xi} d\xi \right) e^{i\omega x} d\omega$$

将括号内外两部分拆开，就自然得到了傅里叶变换对：

$$f(x) = \int_{-\infty}^{\infty} F(\omega) e^{i\omega x} d\omega$$

$$F(\omega) = \frac{1}{2\pi} \int_{-\infty}^{\infty} f(x) e^{-i\omega x} dx$$

*(注：这里将积分里的积分变量 $\xi$ 换回了更常见的 $x$)*
