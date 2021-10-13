```
export DEBUG=sqlite

cds deploy --to sqlite:app/var/my.db
cds build
chmod 666 app/var/my.db
docker build -t alunde/cpapp:latest .
docker run --rm -i -t alunde/cpapp:latest /bin/bash
docker run --rm -p 4004:4004 -t alunde/cpapp:latest
docker stop 5ceeec8af315

make build-image ; make push-image

kubectl apply -n dev -f deployment/pvc.yaml
kubectl get -n dev persistentvolumeclaim

kubectl apply -n dev -f deployment/deployment.yaml
kubectl get -n dev deployments

kubectl apply -n dev -f deployment/apirule.yaml
get -n dev APIRule

echo "https://cpapp.$(kubectl config current-context)"
kubectl logs -n dev -f $(kubectl get pods -n dev -l app=cpapp -o jsonpath='{.items[0].metadata.name}')

kubectl get -n dev pods
kubectl exec -it cpapp-5cfc77c5cf-vl24d -- bash
kubectl exec -n dev -it $(kubectl get pods -n dev -l app=cpapp -o=json | jq -r '.items[0] | .metadata.name') -- bash

// This one..
kubectl exec -n dev -it $(kubectl get pods -n dev -l app=cpapp -o jsonpath='{.items[0].metadata.name}') -- bash

kubectl exec $(kubectl get pods -n dev -l app=cpapp -o jsonpath='{.items[0].metadata.name}') -n dev -t -i /bin/bash
```

# Teardown
```
kubectl delete -n dev -f deployment/deployment.yaml
for i in deployment/*.yaml; do
    kubectl delete -n dev -f $i
done
```

# New Issue: Sync
https://www.sqlite.org/atomiccommit.html

Need to figure out a way to trigger a sync() call to flush changes to disk.

https://cap.cloud.sap/docs/node.js/services#event-handlers

