from django.http import JsonResponse
from django.shortcuts import render
import psutil
import requests


################################################################################
# API
################################################################################
def memory(_):
    return JsonResponse(
        {
            "total_memory": psutil.virtual_memory().total / (1024.0**3),
            "available_memory": psutil.virtual_memory().available / (1024.0**3),
            "used_memory": psutil.virtual_memory().used / (1024.0**3),
            "memory_percentage": psutil.virtual_memory().percent,
        }
    )


def cpu(_):
    return JsonResponse(
        {
            "physical_cores": psutil.cpu_count(logical=False),
            "total_cores": psutil.cpu_count(logical=True),
            "processor_speed": psutil.cpu_freq().current,
            "cpu_usage_per_core": dict(
                enumerate(psutil.cpu_percent(percpu=True, interval=1))
            ),
            "total_cpu_usage": psutil.cpu_percent(interval=1),
        }
    )


def disk(_):
    partitions = psutil.disk_partitions()
    disk_info = {}
    for partition in partitions:
        partition_usage = psutil.disk_usage(partition.mountpoint)
        disk_info[partition.mountpoint] = {
            "total_space": partition_usage.total / (1024.0**3),
            "used_space": partition_usage.used / (1024.0**3),
            "free_space": partition_usage.free / (1024.0**3),
            "usage_percentage": partition_usage.percent,
        }
    return JsonResponse(disk_info)


def unap(request):
    code = request.GET.get("code")
    url = f"https://tramites.unap.edu.pe/tramite/estudiante/{code}?carrera=23"
    res = requests.get(url)
    return JsonResponse(res.json())


def mysql(_):
    running = "mysqld" in (p.name() for p in psutil.process_iter(attrs=["name"]))
    return JsonResponse({"running": running})


################################################################################
# Templates
################################################################################


def memory_template(request):
    return render(request, "memory.html")


def cpu_template(request):
    return render(request, "cpu.html")


def disk_template(request):
    return render(request, "disk.html")


def unap_template(request):
    return render(request, "unap.html")


def mysql_template(request):
    return render(request, "mysql.html")
