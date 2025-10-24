import django_filters
from .models import Task

class TaskFilter(django_filters.FilterSet):
    #Custom behaviour for due_date
    due_date = django_filters.DateFilter(
        field_name='due_date',
        lookup_expr='gte',
        label='Due date after or equal to'
    )

    class Meta:
        model = Task
        fields = ['due_date', 'completed']