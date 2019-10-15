<template>
  <highcharts :options="options" />
</template>

<script>
  export default {
    data: () => ({
      options: {
        chart: {
          height: 1200,
          inverted: true
        },

        title: {
          text: ''
        },

        series: [
          {
            type: 'organization',
            name: 'Highsoft',
            keys: ['from', 'to'],
            data: [
              ['Медицина', 'Химия'],
              ['Медицина', 'Биология'],
              ['Медицина', 'Математика'],
              ['Медицина', 'Информатика'],
              ['Медицина', 'Физика'],
              ['Биология', 'Клиническая медицина'],
              ['Химия', 'Клиническая медицина'],
              ['Клиническая медицина', 'Санитар'],
              ['Клиническая медицина', 'Фармацевт'],
              ['Санитар', 'Лаборант'],
              ['Лаборант', 'Медсестра'],
              ['Медсестра', 'Старшая медсестра'],
              ['Медсестра', 'Врач скорой помощи'],
              ['Медсестра', 'Врач'],
              ['Медсестра', 'Фельдшер'],
              ['Врач', 'Психиатрическое'],
              ['Врач', 'Патологоанатомическое'],
              ['Врач', 'Хирургия'],
              ['Врач', 'Терапия'],
              ['Патологоанатомическое', 'Исследование биоматериалов'],
              ['Исследование биоматериалов', 'Прижизненные исследования'],
              ['Исследование биоматериалов', 'Вскрытие'],
              ['Терапия', 'Педиатр'],
              ['Терапия', 'Стоматолог'],
              ['Терапия', 'Лечебник (взрослые)'],
              ['Лечебник (взрослые)', 'Кардиолог'],
              ['Лечебник (взрослые)', 'Аллерголог'],
              ['Лечебник (взрослые)', 'Дерматология'],
              ['Кардиолог', 'Кардиохирург'],
              ['Хирургия', 'Кардиохирург'],
              ['Кардиолог', 'Аритмолог'],
              ['Аллерголог', 'Аллерголог-иммунолог'],
              ['Дерматология', 'Косметолог-дерматолог'],
              ['Стоматолог', 'Стоматолог-хирург'],
              ['Стоматолог', 'Ортодонт'],
              ['Стоматолог', 'Стоматолог-ортопед'],
              ['Химия', 'Биофизика'],
              ['Биология', 'Биофизика'],
              ['Математика', 'Биофизика'],
              ['Информатика', 'Биофизика'],
              ['Физика', 'Биофизика'],
              ['Биофизика', 'ИТ-медик'],
              ['Биофизика', 'Клинический биоинформатик'],
              ['Биофизика', 'Сетевой врач'],
              ['Биофизика', 'Архитектор медоборудования'],
              ['Архитектор медоборудования', 'Разработчик киберпротезов'],
              ['Клинический биоинформатик', 'ИТ-генетик'],
              ['ИТ-генетик', 'Генетический консультант'],
              ['Генетический консультант', 'Персонифицирующая медицина'],
              ['Сетевой врач', 'Персонифицирующая медицина'],
              ['Фармацевт', 'Аптекарь/Провизор'],
              ['Аптекарь/Провизор', 'Фармаколог'],
              ['Фармаколог', 'Биофармаколог'],
              ['Информатика', 'Биофармаколог'],
            ],  
            lineWidth: 35,    
            levels: [
              {
                level: 0,
                color: '#e3e1e1',
                dataLabels: {
                  color: 'black',
                },
                height: 35
              },
              {
                level: 1,
                color: '#e3e1e1',
                dataLabels: {
                  color: 'black',
                },
                height: 35
              },
              {
                level: 2,
                color: '#e3e1e1',
                dataLabels: {
                  color: 'black',
                },
                height: 35
              },
              {
                level: 3,
                color: '#e3e1e1',
                dataLabels: {
                  color: 'black',
                },
                height: 35
              },
              {
                level: 4,
                color: '#e3e1e1',
                dataLabels: {
                  color: 'black',
                },
                height: 35
              },
              {
                level: 5,
                color: '#e3e1e1',
                dataLabels: {
                  color: 'black',
                },
                height: 35
              },
              {
                level: 6,
                color: '#e3e1e1',
                dataLabels: {
                  color: 'black',
                },
                height: 35
              },
              {
                level: 7,
                color: '#e3e1e1',
                dataLabels: {
                  color: 'black',
                },
                height: 35
              },
              {
                level: 8,
                color: '#e3e1e1',
                dataLabels: {
                  color: 'black',
                },
                height: 35
              },
              {
                level: 9,
                color: '#e3e1e1',
                dataLabels: {
                  color: 'black',
                },
                height: 35
              },
              {
                level: 10,
                color: '#e3e1e1',
                dataLabels: {
                  color: 'black',
                },
                height: 35
              },
              {
                level: 11,
                color: '#e3e1e1',
                dataLabels: {
                  color: 'black',
                },
                height: 35
              },
              {
                level: 12,
                color: '#e3e1e1',
                dataLabels: {
                  color: 'black',
                },
                height: 35
              },
              {
                level: 13,
                color: '#e3e1e1',
                dataLabels: {
                  color: 'black',
                },
                height: 35
              },
              {
                level: 14,
                color: '#e3e1e1',
                dataLabels: {
                  color: 'black',
                },
                height: 35
              },
              {
                level: 15,
                color: '#e3e1e1',
                dataLabels: {
                  color: 'black',
                },
                height: 35
              },
              {
                level: 16,
                color: '#e3e1e1',
                dataLabels: {
                  color: 'black',
                },
                height: 35,
              },
            ],
            nodes: [
              {
                id: 'Медицина',
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                column: 0,
                width: 120,
              },
              {
                id: 'Химия',
                column: 1,
                offset: -120,
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 110,
              },
              {
                id: 'Биология',
                column: 1,
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
                offset: -70,
              },
              {
                id: 'Математика',
                column: 1,
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
                offset: 0,
              },
              {
                id: 'Физика',
                column: 1,
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 110,
                offset: 105,
              },
              {
                id: 'Информатика',
                column: 1,
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 135,
                offset: 65,
              },
              {
                id: 'Клиническая медицина',
                column: 2,
                offset: -380,
                dataLabels: {
                  style: { fontSize: '9px' }
                },
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Биофизика',
                column: 3, 
                offset: 150,
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Санитар',
                column: 4,
                offset: -40,
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Фармацевт',
                column: 4,
                offset: 50,
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'ИТ-медик',
                column: 4,
                offset: 80,
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Архитектор медоборудования',
                column: 4,
                offset: 0,
                dataLabels: {
                  style: { fontSize: '9px' }
                },
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Клинический биоинформатик',
                column: 4,
                offset: 50, 
                width: 120,
                dataLabels: {
                  style: { fontSize: '9px' }
                },
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Сетевой врач',
                column: 4,
                offset: 40,
                dataLabels: {
                  style: { fontSize: '9px' }
                },
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Лаборант',
                column: 5,
                offset: -210,
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Аптекарь/Провизор',
                column: 5,
                offset: -450,
                dataLabels: {
                  style: { fontSize: '9px' }
                },
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Разработчик киберпротезов',
                column: 5,
                offset: 500,
                dataLabels: {
                  style: { fontSize: '9px' }
                },
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'ИТ-генетик',
                column: 5,
                offset: 60,
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Генетический консультант',
                column: 6,
                offset: 130,
                dataLabels: {
                  style: { fontSize: '9px' }
                },
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Медсестра',
                column: 6,
                offset: -290,
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Фармаколог',
                column: 6,
                offset: -350,
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Биофармаколог',
                column: 7,
                offset: -150,
                dataLabels: {
                  style: { fontSize: '9px' }
                },
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Персонифицирующая медицина',
                column: 8,
                offset: 150,
                dataLabels: {
                  style: { fontSize: '9px' }
                },
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Старшая медсестра',
                column: 9,
                offset: -210,
                dataLabels: {
                  style: { fontSize: '9px' }
                },
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Врач скорой помощи',
                column: 9,
                offset: -230,
                dataLabels: {
                  style: { fontSize: '9px' }
                },
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Врач',
                column: 9,
                offset: -250,
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Фельдшер',
                column: 9,
                offset: -250,
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Психиатрическое',
                column: 10,
                offset: -180,
                dataLabels: {
                  style: { fontSize: '9px' }
                },
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Патологоанатомическое',
                column: 10,
                offset: -180,
                dataLabels: {
                  style: { fontSize: '9px' }
                },
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Хирургия',
                column: 10,
                offset: -180,
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Терапия',
                column: 10,
                offset: -180,
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Исследование биоматериалов',
                column: 11,
                offset: -80,
                dataLabels: {
                  style: { fontSize: '9px' }
                },
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120, 
              },
              {
                id: 'Лечебник (взрослые)',
                column: 11,
                offset: -220,
                dataLabels: {
                  style: { fontSize: '9px' }
                },
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120, 
              },
              {
                id: 'Педиатр',
                column: 11,
                offset: 390,
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120, 
              },
              {
                id: 'Стоматолог',
                column: 11,
                offset: 80,
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120, 
              },
              {
                id: 'Стоматолог-хирург',
                column: 12,
                offset: 290,
                dataLabels: {
                  style: { fontSize: '9px' }
                },
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120, 
              },
              {
                id: 'Ортодонт',
                column: 12,
                offset: 280,
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120, 
              },
              {
                id: 'Стоматолог-ортопед',
                column: 12,
                offset: 260,
                dataLabels: {
                  style: { fontSize: '9px' }
                },
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Прижизненные исследования',
                column: 13,
                offset: -130,
                dataLabels: {
                  style: { fontSize: '9px' }
                },
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Вскрытие',
                column: 13,
                offset: -80,
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Кардиолог',
                column: 13,
                offset: -10,
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Аллерголог',
                column: 13,
                offset: 80,
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Дерматология',
                column: 13,
                offset: 80,
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Кардиохирург',
                column: 14,
                offset: 80,
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Аритмолог',
                column: 14,
                offset: 110,
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Аллерголог-иммунолог',
                column: 14,
                offset: 140,
                dataLabels: {
                  style: { fontSize: '9px' }
                },
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
              {
                id: 'Косметолог-дерматолог',
                column: 14,
                offset: 140,
                dataLabels: {
                  style: { fontSize: '9px' }
                },
                image: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
                width: 120,
              },
            ],  
            colorByPoint: false,
            color: '#007ad0',
            dataLabels: {
              color: 'white',
              style: {fontSize: '12px'}
            },
            borderColor: 'white',
            nodeWidth: 35,
            borderRadius: 20,
            height: 40,
          }
        ],
        tooltip: {
          outside: true
        },
        exporting: {
          enabled: false
        }
      }
    }),
  };
</script>

<style>
.tree {
  background: rgba(0, 0, 0, 0.05);
}
</style>
