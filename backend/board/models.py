import datetime
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    first_name = models.CharField('Имя', max_length=64)
    last_name = models.CharField('Фамилия', max_length=64)
    email = models.EmailField('Почта', max_length=64, unique=True)
    username = models.CharField('Имя пользователя', max_length=128)
    about = models.TextField()
    birth_date = models.DateField('Дата рождения', default=datetime.date.today)
    GENDER_TYPES = (("Male", "Male"), ("Female", "Female"))
    gender = models.CharField('Пол', max_length=64, choices=GENDER_TYPES)
    avatar = models.ImageField('Аватар', upload_to="users/%Y/%m/%d/", blank=True)
    is_moderator = models.BooleanField("Модератор", default=False)
    is_administrator = models.BooleanField("Администратор", default=False)
    is_banned = models.BooleanField("Забанен", default=False)
    EMAIL_FIELD = "username"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return f"{self.username}"
    
    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'


class Topic(models.Model):
    title = models.CharField('Название', max_length=64)
    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Автор')

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = 'Тема'
        verbose_name_plural = 'Темы'


class Board(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Автор')
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, verbose_name='Тема')
    title = models.CharField('Название', max_length=64)
    description = models.TextField('Описание')
    image = models.ImageField(upload_to="boards/%Y/%m/%d/", blank=True)

    def __str__(self):
        return f"{self.title} - {self.topic}"
    
    class Meta:
        verbose_name = 'Доска'
        verbose_name_plural = 'Доски'


class Thread(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Автор')
    title = models.CharField('Название', max_length=64)
    board = models.ForeignKey(Board, on_delete=models.CASCADE, verbose_name='Доска')
    is_locked = models.BooleanField(default=False, verbose_name='Заблокирована')
    is_sticky = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.board.title}"

    class Meta:
        verbose_name = 'Тред'
        verbose_name_plural = 'Треды'


class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Автор')
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE, verbose_name='Тред')
    created_at = models.DateTimeField(auto_now_add=True)
    message = models.TextField('Сообщение')

    def __str__(self):
        return (
            f"{self.author.username} - {self.thread.title} - {self.thread.board.title}"
        )
    
    class Meta:
        verbose_name = 'Пост'
        verbose_name_plural = 'Посты'
